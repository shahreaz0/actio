import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const tasks = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  done: int({ mode: "boolean" }).notNull().default(false),
  createdAt: int({ mode: "timestamp" }).default(new Date()),
  updatedAt: int({ mode: "timestamp" }).$onUpdate(() => new Date()),
})
