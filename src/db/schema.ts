import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const tasks = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 255 }).notNull(),
  done: int({ mode: "boolean" }).notNull().default(false),
  createdAt: int({ mode: "timestamp" }).default(new Date()).notNull(),
  updatedAt: int({ mode: "timestamp" })
    .$onUpdate(() => new Date())
    .notNull(),
})
