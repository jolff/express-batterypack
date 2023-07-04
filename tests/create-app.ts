import * as h from "./_helper"

import { createAppAndListen } from "../src/create-app"
export default async function () {
  h.logBox("CREATE APP")
  await createAppAndListen((app) => {
    return Promise.resolve()
  })
  return await Promise.resolve()
}
