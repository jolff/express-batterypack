// FEATURE @response Add Configuration (Headers....)
import dotenv from "dotenv"
dotenv.config()

import e from "express"
import { ApiResult, ErrorCode, SuccessCode } from "./canonical-result"

export function respond(res: e.Response, result: ApiResult<unknown>) {
  res.status(result.status)
  res.json(result)
}

export function respondSuccess(res: e.Response, status: SuccessCode, data: unknown = undefined) {
  return respond(res, {
    success: true,
    status,
    data,
  })
}

export function respondSuccessData(res: e.Response, status: SuccessCode, data: unknown) {
  return respondSuccess(res, status, data)
}

export function respondError(res: e.Response, status: ErrorCode, name = "", message = "", data: unknown = undefined) {
  return respond(res, {
    success: false,
    status,
    name,
    message,
    data,
  })
}

export function respondErrorData(res: e.Response, status: ErrorCode, data: unknown, name = "", message = "") {
  return respondError(res, status, name, message, data)
}
