import { z } from "zod"

export const idParamsSchema = z.object({
  id: z.coerce.number().openapi({ param: { name: "id", in: "path" } }),
})

export const notFoundSchema = z.object({
  success: z.boolean().openapi({ example: false }),
  message: z.string().openapi({ example: "Not found" }),
})
