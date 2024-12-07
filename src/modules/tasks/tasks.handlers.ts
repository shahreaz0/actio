import { db } from "@/db"
import { tasks } from "@/db/schema"
import type { AppBindings } from "@/lib/types"
import type { RouteHandler } from "@hono/zod-openapi"
import { eq } from "drizzle-orm"
import type {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from "./tasks.routes"

export const list: RouteHandler<ListRoute, AppBindings> = async (c) => {
  const tasks = await db.query.tasks.findMany()

  return c.json({
    success: true,
    data: tasks,
  })
}

export const create: RouteHandler<CreateRoute, AppBindings> = async (c) => {
  const task = c.req.valid("json")

  const [inserted] = await db.insert(tasks).values(task).returning()

  return c.json(
    {
      success: true,
      data: inserted,
    },
    200,
  )
}

export const getOne: RouteHandler<GetOneRoute, AppBindings> = async (c) => {
  const params = c.req.valid("param")

  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, params.id)
    },
  })

  if (!task) {
    return c.json({ success: false, message: "Not found" }, 404)
  }

  return c.json(
    {
      success: true,
      data: task,
    },
    200,
  )
}

export const patch: RouteHandler<PatchRoute, AppBindings> = async (c) => {
  const params = c.req.valid("param")
  const updates = c.req.valid("json")

  const [task] = await db
    .update(tasks)
    .set(updates)
    .where(eq(tasks.id, params.id))
    .returning()

  if (!task) {
    return c.json({ success: false, message: "Not found" }, 404)
  }

  return c.json(
    {
      success: true,
      data: task,
    },
    200,
  )
}

export const remove: RouteHandler<RemoveRoute, AppBindings> = async (c) => {
  const params = c.req.valid("param")

  const results = await db.delete(tasks).where(eq(tasks.id, params.id))

  if (results.rowsAffected === 0) {
    return c.json({ success: false, message: "Not found" }, 404)
  }

  return c.json({ success: true, data: { id: params.id } }, 200)
}
