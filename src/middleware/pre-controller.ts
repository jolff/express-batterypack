import e from "express"
import { respondError } from "../response"

/**
 * Middleware to control the request header `Content-Type`
 * @param contentType Wanted value for the header `Content-Type`. Is passed to `express.Request.is()`. Defaults to `application/json`
 * @returns A middleware checking for the right `contentType`. Responds with status 415 if `Content-Type` doesnt match - but only when the HTTP method is **not** `GET`
 */
export function requireContentType(contentType = "application/json") {
  return function (req: e.Request, res: e.Response, next: e.NextFunction) {
    if (req.method.toLowerCase() !== "get" && !req.is(contentType)) {
      return respondError(res, 415, `Content-Type of the request MUST be ${contentType}`)
    } else {
      next()
    }
  }
}
