import { createRouter } from "@/lib/create-app"
import { createRoute, z } from "@hono/zod-openapi"

export const index = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    summary: "Health Check",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Health Check API",
      },
    },
  }),
  (c) => {
    return c.json({ message: "OK" })
  },
)
