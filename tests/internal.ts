import * as h from "./_helper"
import { logInfo, logError, logWarning } from "../src/_internal/logging"

class MyError extends Error {
  name = "MyError"
}
export default function () {
  h.logBox("INTERNAL")
  logInfo("INFO")
  logWarning("WARNING")
  logError("ERROR")
  return Promise.resolve()
}
