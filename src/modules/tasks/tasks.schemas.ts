import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { tasks } from "@/db/schema"

export const selectTasksSchema = createSelectSchema(tasks)
export const insertTasksSchema = createInsertSchema(tasks, {
  name: (schema) => schema.name.max(255).min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
