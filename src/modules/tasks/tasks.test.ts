import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from "vitest"

import { execSync } from "node:child_process"
import fs from "node:fs"
import { env } from "@/env"
import { testClient } from "hono/testing"
import { tasks } from "./tasks.index"

if (env.NODE_ENV !== "test") {
  throw new Error("NODE_ENV must be 'test'")
}

const client = testClient(tasks)

describe("tasks routes", () => {
  beforeAll(() => {
    execSync("pnpm drizzle-kit push")
  })

  afterAll(() => {
    fs.rmSync("test.db", { force: true })
  })

  // POST /tasks

  it("post /tasks validates the body", async () => {
    const res = await client.tasks.$post({
      // @ts-expect-error
      json: {
        done: false,
      },
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const json = await res.json()
      expect(json.error.issues[0].path[0]).toBe("name")
    }
  })

  const payload = {
    id: 1,
    name: "Learning Hono",
    done: false,
  }

  it("post /tasks create a task", async () => {
    const res = await client.tasks.$post({
      json: payload,
    })

    expect(res.status).toBe(200)

    if (res.status === 200) {
      const json = await res.json()
      expect(json.data.name).toBe(payload.name)
      expect(json.data.done).toBe(payload.done)
    }
  })

  // GET /tasks

  it("get /tasks list of all tasks", async () => {
    const res = await client.tasks.$get()

    expect(res.status).toBe(200)

    if (res.status === 200) {
      const json = await res.json()

      expectTypeOf(json.data).toBeArray()
      expect(json.success).toBe(true)
    }
  })

  // GET /tasks/{id}

  it("get /tasks/{id} validates the id path params", async () => {
    const res = await client.tasks[":id"].$get({
      param: {
        // @ts-expect-error
        id: "not accpetable",
      },
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const json = await res.json()

      expect(json.error.issues[0].path).toContain("id")
    }
  })

  it("get /tasks/{id} returns 404 when task not found", async () => {
    const res = await client.tasks[":id"].$get({
      param: {
        id: 99,
      },
    })

    expect(res.status).toBe(404)

    if (res.status === 404) {
      const json = await res.json()
      expect(json.message).toBe("Not found")
    }
  })

  it("get /tasks/{id} get one task", async () => {
    const res = await client.tasks[":id"].$get({
      param: {
        id: 1,
      },
    })

    expect(res.status).toBe(200)

    if (res.status === 200) {
      const json = await res.json()

      expect(json.success).toBe(true)
      expect(json.data.name).toBe(payload.name)
    }
  })

  // PATCH /tasks/{id}

  it("patch /tasks/{id} validates path param id", async () => {
    const res = await client.tasks[":id"].$patch({
      param: {
        // @ts-expect-error
        id: "test",
      },

      json: {},
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const json = await res.json()

      expect(json.error.issues[0].path).toContain("id")
    }
  })

  it("patch /tasks/{id} validates body", async () => {
    const res = await client.tasks[":id"].$patch({
      param: {
        id: payload.id,
      },
      json: {
        name: "",
      },
    })

    // expect(res.status).toBe(422)

    if (res.status === 422) {
      const json = await res.json()

      expect(json.error.issues[0].path).toContain("name")
    }
  })

  it("patch /tasks/{id} returns 404 when task not found", async () => {
    const res = await client.tasks[":id"].$patch({
      param: {
        id: 99,
      },
      json: {
        name: "test",
      },
    })

    expect(res.status).toBe(404)

    if (res.status === 404) {
      const json = await res.json()

      expect(json.message).toBe("Not found")
    }
  })

  it("patch /tasks/{id} update a task", async () => {
    const res = await client.tasks[":id"].$patch({
      param: {
        id: payload.id,
      },
      json: {
        name: "updated task",
      },
    })

    expect(res.status).toBe(200)

    if (res.status === 200) {
      const json = await res.json()

      expect(json.data.name).toBe("updated task")
    }
  })

  // DELETE /tasks/{id}

  it("delete /tasks/{id} validates path param id", async () => {
    const res = await client.tasks[":id"].$delete({
      param: {
        // @ts-expect-error
        id: "test",
      },
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const json = await res.json()

      expect(json.error.issues[0].path).toContain("id")
    }
  })

  it("delete /tasks/{id} returns 404 when task not found", async () => {
    const res = await client.tasks[":id"].$delete({
      param: {
        id: 99,
      },
    })

    expect(res.status).toBe(404)

    if (res.status === 404) {
      const json = await res.json()

      expect(json.message).toBe("Not found")
    }
  })

  it("patch /tasks/{id} delete a task", async () => {
    const res = await client.tasks[":id"].$delete({
      param: {
        id: payload.id,
      },
    })

    expect(res.status).toBe(200)

    if (res.status === 200) {
      const json = await res.json()

      expect(json.data.id).toBe(payload.id)
    }
  })
})
