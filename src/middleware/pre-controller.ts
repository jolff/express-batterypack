import e from "express"
import { OptionsJson } from "body-parser"
import { respondError } from "../response"

/**
 * Middleware to control the request header `Content-Type`
 * @param contentType Wanted value for the header `Content-Type`. Is passed to `express.Request.is()`.
 * @returns A middleware checking for the right `contentType`. Responds with status 415 if `Content-Type` doesnt match - but only when the HTTP method is **not** `GET`
 */
export function hasContentType(contentType: string) {
  return function (req: e.Request, res: e.Response, next: e.NextFunction) {
    if (req.method.toLowerCase() !== "get" && !req.is(contentType)) {
      return respondError(res, 415, `Content-Type of the request MUST be ${contentType}`)
    }
    next()
  }
}

export function hasBody(req: e.Request, res: e.Response, next: e.NextFunction) {
  if (req.body === undefined || req.body === null) {
    return respondError(res, 400, "Request needs a body")
  }
  return next()
}

export const requireJSONWithConfig = (options: OptionsJson | undefined = undefined) => [
  hasContentType("application/json"),
  e.json(options),
  hasBody,
]

export const requireJSON = requireJSONWithConfig()
