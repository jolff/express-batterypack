import dotenv from "dotenv"
dotenv.config()

import express, { Express } from "express"
import { OptionsJson } from "body-parser"
import { extendDefaultObject } from "./_internal/object"
import { configEBP } from "./env"
import { logInfo } from "./_internal/logging"

const standardAppConfig = {
  json: false as false | true | OptionsJson,
  /**
   * The port the created app should listen on
   */
  port: 8080,
  /**
   * If a standard error handler for when no route is matched should be appended
   */
  add404Handler: true,
}

export type AppConfig = typeof standardAppConfig

export async function createAppAndListen(
  applyAppLogic: (app: Express) => Promise<void>,
  appConfig: Partial<AppConfig> = {}
) {
  logInfo("Creating ExpressJS App")
  const config = extendDefaultObject(standardAppConfig, appConfig)
  const app = express()
  // Do stuff before applying logic
  if (config.json === true) app.use(express.json())
  else if (config.json !== false) app.use(express.json(config.json))

  await applyAppLogic(app)
  // Do stuff after applying logic

  const promise = new Promise<void>((resolve) => {
    app.listen(config.port, () => {
      logInfo("Express App listening on port " + config.port)
      resolve()
    })
  })

  await promise

  return app
}
