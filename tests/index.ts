import createApp from "./create-app"
import env from "./env"
import internal from "./internal"
import middleware from "./middleware"
import response from "./response"

async function execute() {
  await createApp()
  //await env()
  // await internal()
  // await middleware()
  // await response()
}

execute().catch(console.error)
