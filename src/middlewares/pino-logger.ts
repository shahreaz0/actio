import { env } from "@/env"
import { pinoLogger } from "hono-pino"

export function logger() {
  const isProduction = env.NODE_ENV === "production"
  return pinoLogger({
    pino: {
      level: process.env.LOG_LEVEL || "info",
      transport: isProduction
        ? undefined
        : {
            target: "pino-pretty",
            options: {
              colorize: true,
            },
          },
    },
  })
}
