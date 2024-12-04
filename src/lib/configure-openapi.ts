import packageJSON from "package.json"
import type { AppOpenAPI } from "./types"

import { apiReference } from "@scalar/hono-api-reference"

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Actio API",
      description:
        "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [https://swagger.io](https://swagger.io). \n\nSome useful links:\n- [Actio repository](https://github.com/shahreaz0/actio)",
    },
  })

  app.get(
    "/reference",
    apiReference({
      spec: {
        url: "/doc",
      },
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "axios",
      },
    }),
  )
}
