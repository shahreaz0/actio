import { OpenAPIHono } from "@hono/zod-openapi"
import type { PinoLogger } from "hono-pino"
import { requestId } from "hono/request-id"
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares"

import { logger } from "@/middlewares/pino-logger"

export type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

export const app = new OpenAPIHono<AppBindings>()

app.use(serveEmojiFavicon("🔥"))
app.use(requestId())
app.use(logger())

app.get("/", (c) => {
  c.var.logger.info("hello")

  return c.text("Hello Hono!")
})

app.notFound(notFound)
app.onError(onError)
