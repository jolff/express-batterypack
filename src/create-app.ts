import dotenv from "dotenv"
dotenv.config()

import express, { Express } from "express"
import { Server } from "http"
import { OptionsJson } from "body-parser"
import { extendDefaultObject } from "./_internal/object"
import { logInfo } from "./_internal/logging"
import { respondError, respondSuccess } from "./response"

const standardAppConfig = {
  json: true as false | true | OptionsJson,
  /**
   * The port the created app should listen on
   */
  port: 8080,
  /**
   * If an endpoint /health should be added which just answers with an 200 response
   */
  addHealthEndpoint: true,
  /**
   * If a standard error handler for when no route is matched should be appended
   */
  add404Handler: true,
}

export type AppConfig = typeof standardAppConfig
export type AppServerConfig = {
  app: Express
  server: Server
  config: AppConfig
}

export async function createAppAndListen(
  applyAppLogic: (app: Express) => Promise<void>,
  appConfig: Partial<AppConfig> = {}
): Promise<AppServerConfig> {
  const config = extendDefaultObject(standardAppConfig, appConfig)
  logInfo("Creating ExpressJS App with config:", config)
  const app = express()
  // Do stuff before applying logic
  if (config.json === true) {
    app.use(express.json())
    logInfo("Using express.json middleware globally without options")
  } else if (config.json !== false) {
    app.use(express.json(config.json))
    logInfo("Using express.json middleware globally with options:", config.json)
  }

  if (config.addHealthEndpoint) {
    app.get("/health", (_req, res) => {
      return respondSuccess(res, 200)
    })
    logInfo("Adding endpoint /health")
  }

  await applyAppLogic(app)

  // Do stuff after applying logic
  if (config.add404Handler) {
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (!res.headersSent) {
        respondError(res, 404, "not-found", `Endpoint ${req.path} does not exist.`)
      } else next()
    })
    logInfo("Adding standard 404 error handler")
  }

  let server: Server | null = null
  const promise = new Promise<void>((resolve) => {
    server = app.listen(config.port, () => {
      logInfo("Express App listening on port " + config.port)
      resolve()
    })
  })

  await promise

  return {
    app,
    server: server as unknown as Server,
    config,
  }
}
