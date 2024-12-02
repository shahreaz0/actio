import { configureOpenAPI } from "./lib/configure-openapi"
import { createApp } from "./lib/create-app"
import { index } from "./routes/index.route"

const routes = [index]

export const app = createApp()

configureOpenAPI(app)

for (const route of routes) {
  app.route("/", route)
}

app.get("/", (c) => {
  return c.json({ message: "hello" })
})
