import dotenv from "dotenv"
dotenv.config()

import e from "express"
import { z } from "zod"
import { Query, ParamsDictionary } from "express-serve-static-core"

import { respondError } from "../response"
import { extendDefaultObject } from "../_internal/object"

const standardValidationConfig = {
  sendErrorData: false,
}

export type ValidationConfig = typeof standardValidationConfig
export function validateBody<
  P = ParamsDictionary,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResBody = any,
  ReqQuery = Query,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Locals extends Record<string, any> = Record<string, any>
>(config: Partial<ValidationConfig>) {
  const conf = extendDefaultObject(standardValidationConfig, config)
  return function (zodObject: z.ZodType) {
    return (
      req: e.Request<P, ResBody, z.infer<typeof zodObject>, ReqQuery, Locals>,
      res: e.Response,
      next: e.NextFunction
    ) => {
      const validation = zodObject.safeParse(req.body)
      if (validation.success === true) {
        req.body = validation.data
        next()
      } else {
        return respondError(
          res,
          400,
          "zod-validation",
          "Validation of body failed",
          config.sendErrorData ? validation.error : undefined
        )
      }
    }
  }
}
