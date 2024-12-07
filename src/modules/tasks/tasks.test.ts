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

  //   afterAll(() => {
  //     fs.rmSync("test.db", { force: true })
  //   })

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

  it("post /tasks create a task", async () => {
    const payload = {
      name: "Learning Hono",
      done: false,
    }

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

  it("get /tasks list of all tasks", async () => {
    const res = await client.tasks.$get()

    expect(res.status).toBe(200)

    if (res.status === 200) {
      const json = await res.json()

      expectTypeOf(json.data).toBeArray()
      expect(json.success).toBe(true)
    }
  })
})
