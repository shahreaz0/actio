import { createApp } from "./lib/create-app"

export const app = createApp()

app.get("/", (c) => {
  return c.json({ message: "hello" })
})
