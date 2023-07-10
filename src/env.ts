// IMPLEMENT @env crucialCheck -> Exit process if not set
// TEST @env crucialCheck
import dotenv from "dotenv"
dotenv.config()

export function getBooleanFromEnv(env: string, defaultVal: boolean = false) {
  if (process.env[env] === undefined) return defaultVal
  const val = process.env[env]
  if (val === "true") return true
  if (val === "false") return false
  if (val === "0") return false
  if (val === "1") return true
  return defaultVal
}

export function getStringFromEnv(env: string, defaultVal: string = "") {
  const val = process.env[env]
  if (val === undefined) return defaultVal
  else return val
}

export function getStringArrayFromEnv<A extends string, D extends A>(
  env: string,
  allowedVals: A[],
  defaultVals: D[] = []
): A[] {
  const val = process.env[env]
  if (val === undefined) return defaultVals
  const vals = val
    .split(",")
    .map((v) => v.trim())
    .filter((v) => allowedVals.includes(v as A)) as A[]
  return vals
  //
}
export const configEBP = {
  EBP_APPNAME: getStringFromEnv("EBP_APPNAME", ""),
  EBP_LOGGING_TIMESTAMP: getBooleanFromEnv("EBP_LOGGING_TIMESTAMP", true),
  EBP_LOGGING_LEVELS: getStringArrayFromEnv("EBP_LOGGING_LEVELS", ["info", "warning", "error", "all", "none"], ["all"]),
}
