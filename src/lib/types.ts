import type { PinoLogger } from "hono-pino"

export type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}
