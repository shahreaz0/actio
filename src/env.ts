import { ZodError, z } from "zod"

process.loadEnvFile()

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
  PORT: z.coerce.number().default(9999),
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
