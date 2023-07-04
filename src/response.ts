// FEATURE Response: Add Configuration (Headers....)
// FEATURE extendConfig -> use in respond
import dotenv from "dotenv"
dotenv.config()

import e from "express"
import { ApiResult } from "./canonical-result"

function respond(res: e.Response, result: ApiResult<unknown>) {
  //
}

function respondSuccess() {}

function respondError() {}
