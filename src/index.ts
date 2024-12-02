import { app } from "@/app"
import { env } from "@/env"
import { serve } from "@hono/node-server"

const port = env.PORT || 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
