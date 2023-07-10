import { Express } from "express"
import axios from "axios"

import { createApp } from "../../src"

let app: createApp.AppServerConfig | undefined = undefined

export async function startApp(
  applyAppLogic: (app: Express) => Promise<void>,
  appConfig: Partial<createApp.AppConfig> = {}
) {
  await stopApp()
  app = await createApp.createAppAndListen(applyAppLogic, appConfig)
}

export async function stopApp() {
  return new Promise<true | Error>((resolve) => {
    if (!app) resolve(true)
    else {
      app.server.close((err) => {
        app = undefined
        if (!err) resolve(true)
        else resolve(err)
      })
    }
  })
}

export function getClient() {
  if (!app) throw new Error("Could not generate client since express app is not running")
  else
    return axios.create({
      baseURL: "http://localhost:8080",
    })
}
