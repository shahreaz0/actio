import { ZodError, z } from "zod"

// process.loadEnvFile()

import path from "node:path"
import dotenv from "dotenv"

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  ),
})

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
  PORT: z.coerce.number().default(9999),
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
})

export let env: z.infer<typeof envSchema>

try {
  env = envSchema.parse(process.env)
} catch (error) {
  if (error instanceof ZodError) {
    console.error("Invalid env")
    console.error(error.flatten().fieldErrors)

    process.exit(1)
  }
}
