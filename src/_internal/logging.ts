import dotenv from "dotenv"
dotenv.config()

import { configEBP } from "../env"
function _log(heading: string, ...lines: (string | Error)[]) {
  let firstLine = ""
  if (configEBP.EBP_LOGGING_TIMESTAMP) firstLine += `[${new Date().toISOString()}] `
  if (configEBP.EBP_APPNAME) firstLine += `(${configEBP.EBP_APPNAME}) `
  firstLine += heading
  console.log(firstLine + "\n")
  lines.forEach((line) => {
    if (typeof line === "string") {
      line = line
        .split("\n")
        .filter((p) => p !== "")
        .join("\n\n")
      console.log(line + "\n")
    } else if (line instanceof Error) {
      console.log(`${line.name} (${line.message})`)
      console.log(line.stack)
      console.log()
    }
  })
}

export function logInfo(heading: string, ...lines: (string | Error)[]) {
  if (
    !configEBP.EBP_LOGGING_LEVELS.includes("none") &&
    (configEBP.EBP_LOGGING_LEVELS.includes("all") || configEBP.EBP_LOGGING_LEVELS.includes("info"))
  ) {
    _log(heading, ...lines)
  }
}
export function logWarning(heading: string, ...lines: (string | Error)[]) {
  if (
    !configEBP.EBP_LOGGING_LEVELS.includes("none") &&
    (configEBP.EBP_LOGGING_LEVELS.includes("all") || configEBP.EBP_LOGGING_LEVELS.includes("warning"))
  ) {
    _log(heading, ...lines)
  }
}
export function logError(heading: string, ...lines: (string | Error)[]) {
  if (
    !configEBP.EBP_LOGGING_LEVELS.includes("none") &&
    (configEBP.EBP_LOGGING_LEVELS.includes("all") || configEBP.EBP_LOGGING_LEVELS.includes("error"))
  ) {
    _log(heading, ...lines)
  }
}

/**
 * Logs only when NODE_ENV !== production
 */
/* export function debug(heading: string, ...lines: (string | Error)[]) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
    console.log("== == == == == == ==  D E B U G  == == == == == == ==")
    log(heading, ...lines)
  }
} */
