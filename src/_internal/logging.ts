import dotenv from "dotenv"
dotenv.config()

function logIndentedString(line: string, level = 1) {
  console.log(
    line
      .split("\n")
      .filter((p) => p !== "")
      .map((l) => "  ".repeat(level) + l)
      .join("\n")
  )
}
type LogLine = string | Error | Record<string, any>
import { configEBP } from "../env"
function _log(heading: string, ...lines: LogLine[]) {
  let firstLine = ""
  if (configEBP.EBP_LOGGING_TIMESTAMP) firstLine += `[${new Date().toISOString()}] `
  if (configEBP.EBP_APPNAME) firstLine += `(${configEBP.EBP_APPNAME}) `
  firstLine += heading
  console.log(firstLine)
  lines.forEach((line) => {
    if (typeof line === "string") {
      logIndentedString(line)
    } else if (line instanceof Error) {
      logIndentedString(`${line.name} (${line.message})`)
      if (line.stack) {
        logIndentedString(line.stack)
      }
    } else {
      logIndentedString("{")
      Object.getOwnPropertyNames(line).forEach((key) => {
        if (typeof line[key] !== "object") {
          logIndentedString(`${key}: ${String(line[key])}`, 2)
        } else {
          logIndentedString(`${key}: {`, 2)
          Object.getOwnPropertyNames(line[key]).forEach((keykey) => {
            logIndentedString(`${keykey}: ${String(line[key][keykey])}`, 3)
          })
          logIndentedString("}", 2)
        }
      })
      logIndentedString("}")
    }
  })
}

export function logInfo(heading: string, ...lines: LogLine[]) {
  if (
    !configEBP.EBP_LOGGING_LEVELS.includes("none") &&
    (configEBP.EBP_LOGGING_LEVELS.includes("all") || configEBP.EBP_LOGGING_LEVELS.includes("info"))
  ) {
    _log(heading, ...lines)
  }
}
export function logWarning(heading: string, ...lines: LogLine[]) {
  if (
    !configEBP.EBP_LOGGING_LEVELS.includes("none") &&
    (configEBP.EBP_LOGGING_LEVELS.includes("all") || configEBP.EBP_LOGGING_LEVELS.includes("warning"))
  ) {
    _log(heading, ...lines)
  }
}
export function logError(heading: string, ...lines: LogLine[]) {
  if (
    !configEBP.EBP_LOGGING_LEVELS.includes("none") &&
    (configEBP.EBP_LOGGING_LEVELS.includes("all") || configEBP.EBP_LOGGING_LEVELS.includes("error"))
  ) {
    _log(heading, ...lines)
  }
}
