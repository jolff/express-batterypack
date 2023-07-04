import { configEBP } from "../src/env"
import * as h from "./_helper"
export default function () {
  h.logBox("ENV")
  console.log(`EBP_APPNAME: ${process.env.EBP_APPNAME}`)
  console.log(`EBP_LOGGING_DISABLED: ${process.env.EBP_LOGGING_DISABLED}`)
  console.log(`EBP_LOGGING_TIMESTAMP: ${process.env.EBP_LOGGING_TIMESTAMP}`)
  console.log(configEBP)
  return Promise.resolve()
}
