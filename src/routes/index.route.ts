import { createRouter } from "@/lib/create-app"
import { createRoute, z } from "@hono/zod-openapi"

export const index = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Actio API index",
      },
    },
  }),
  (c) => {
    return c.json({ message: "hello" })
  },
)
