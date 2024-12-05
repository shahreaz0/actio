import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const tasks = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 255 }).notNull(),
  done: int({ mode: "boolean" }).notNull().default(false),
  createdAt: int({ mode: "timestamp" }).default(new Date()).notNull(),
  updatedAt: int({ mode: "timestamp" })
    .$onUpdate(() => new Date())
    .notNull(),
})

export const selectTasksSchema = createSelectSchema(tasks)
export const insertTasksSchema = createInsertSchema(tasks, {
  name: (schema) => schema.name.max(255).min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
