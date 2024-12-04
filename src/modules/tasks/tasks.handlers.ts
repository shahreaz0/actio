import type { AppBindings } from "@/lib/types"
import type { RouteHandler } from "@hono/zod-openapi"
import type { ListRoute } from "./tasks.routes"

export const list: RouteHandler<ListRoute, AppBindings> = (c) => {
  return c.json({
    message: "Success",
    data: [{ name: "Go shopping", done: false, id: "1" }],
  })
}
