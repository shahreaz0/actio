import { idParamsSchema, notFoundSchema } from "@/lib/schema-constants"
import { createRoute, z } from "@hono/zod-openapi"
import { oneOf } from "stoker/openapi/helpers"
import { createErrorSchema } from "stoker/openapi/schemas"
import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "./tasks.schemas"

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
            data: z.array(selectTasksSchema),
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
    422: {
      description: "invalid body",
      content: {
        "application/json": {
          schema: createErrorSchema(insertTasksSchema),
        },
      },
    },
  },
})

export const getOne = createRoute({
  tags,
  method: "get",
  path: "/tasks/{id}",
  summary: "Get a task",
  description: "Get all the tasks of a user",
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean().openapi({ example: true }),
            data: selectTasksSchema,
          }),
        },
      },
    },
    404: {
      description: "not found",
      content: {
        "application/json": {
          schema: notFoundSchema,
        },
      },
    },
  },
})

export const patch = createRoute({
  tags,
  method: "patch",
  path: "/tasks/{id}",
  summary: "Update a task",
  description: "Update a task of a user",
  request: {
    params: idParamsSchema,
    body: {
      description: "body",
      content: {
        "application/json": {
          schema: patchTasksSchema,
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
            success: z.boolean().openapi({ example: true }),
            data: selectTasksSchema,
          }),
        },
      },
    },
    422: {
      description: "invalid body",
      content: {
        "application/json": {
          schema: {
            oneOf: oneOf([
              createErrorSchema(patchTasksSchema),
              createErrorSchema(idParamsSchema),
            ]),
          },
        },
      },
    },
    404: {
      description: "not found",
      content: {
        "application/json": {
          schema: notFoundSchema,
        },
      },
    },
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
