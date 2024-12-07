import { idParamsSchema, notFoundSchema } from "@/lib/schema-constants"
import { createRoute, z } from "@hono/zod-openapi"
import { createErrorSchema } from "stoker/openapi/schemas"
import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "./tasks.schemas"

const tags = ["Tasks"]

export const list = createRoute({
  tags,
  method: "get",
  path: "/tasks",
  summary: "Get task list",
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
  summary: "Create a task",
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
    422: {
      description: "invalid path params",
      content: {
        "application/json": {
          schema: createErrorSchema(idParamsSchema),
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
          schema: z.union([
            createErrorSchema(patchTasksSchema),
            createErrorSchema(idParamsSchema),
          ]),
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

export const remove = createRoute({
  tags,
  method: "delete",
  path: "/tasks/{id}",
  summary: "Delete a task",
  description: "Delete a task of a user",
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: "successful",
      content: {
        "application/json": {
          schema: z.object({ success: z.boolean(), data: z.object({ id: z.number() }) }),
        },
      },
    },
    422: {
      description: "invalid path params",
      content: {
        "application/json": {
          schema: createErrorSchema(idParamsSchema),
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
export type RemoveRoute = typeof remove
