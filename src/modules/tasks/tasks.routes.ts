import { createRoute, z } from "@hono/zod-openapi"
import { insertTasksSchema, selectTasksSchema } from "./tasks.schemas"

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
          schema: z.object({
            success: z.boolean().openapi({ example: true }),
            data: z.array(selectTasksSchema.openapi("Task")),
          }),
        },
      },
    },
  },
})

export const create = createRoute({
  tags,
  method: "post",
  path: "/tasks",
  summary: "Create a Task",
  description: "You can create tasks for a user",
  request: {
    body: {
      description: "The task to create",
      content: {
        "application/json": {
          schema: insertTasksSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            data: selectTasksSchema,
          }),
        },
      },
    },
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
