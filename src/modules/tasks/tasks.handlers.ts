import { db } from "@/db"
import { tasks } from "@/db/schema"
import type { AppBindings } from "@/lib/types"
import type { RouteHandler } from "@hono/zod-openapi"
import type { CreateRoute, ListRoute } from "./tasks.routes"

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

  return c.json({
    success: true,
    data: inserted,
  })
}
