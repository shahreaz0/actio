import { createRoute, z } from "@hono/zod-openapi"

const tags = ["Tasks"]

export const list = createRoute({
  tags,
  method: "get",
  path: "/tasks",
  summary: "Get Task List",
  description: "Get all the tasks of a user",
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string().openapi({ example: "Success" }),
              data: z.array(
                z.object({
                  id: z.string().openapi({ example: "1" }),
                  name: z.string().openapi({ example: "Yoshi" }),
                  done: z.boolean().openapi({ example: false }),
                }),
              ),
            })
            .openapi("Task"),
        },
      },
    },
  },
})

export type ListRoute = typeof list
