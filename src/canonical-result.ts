/**
 * The most generic result of a (async. or sync.) operation, function, method call or the like
 */
type _GenericResult<Success extends boolean> = {
  /**
   * If the result is a success or not
   */
  success: Success
}

type _DataObject<Data> = {
  /**
   * The actual result / data
   */
  data: Data
}

export type SuccessCode = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226
export type ClientErrorCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
export type ServerErrorCode = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511
export type ErrorCode = ClientErrorCode | ServerErrorCode

type WithStatusCode<Status extends ErrorCode | SuccessCode> = {
  /**
   * A HTTP status code.
   */
  status: Status
}
/**
 * The successful result of a (async. or sync.) operation, function, method call or the like.\
 * It is just informational, i.e. it has no data appended.
 */
export type SuccessInformationResult = _GenericResult<true>
/**
 * Canonical result object of an API call which was successful but has no data as response
 */
export type ApiSuccessInformationResult = SuccessInformationResult & WithStatusCode<SuccessCode>
/**
 * The successful result of a (async. or sync.) operation, function, method call or the like containing the result `data`.
 */
export type SuccessDataResult<Data> = _GenericResult<true> & _DataObject<Data>
/**
 * Canonical result object of an API call which was successful and has `data` in its response
 */
export type ApiSuccessDataResult<Data> = SuccessDataResult<Data> & WithStatusCode<SuccessCode>

type _BaseErrorResult<ErrorName extends string> = _GenericResult<false> & {
  /**
   * Name of the error. Could be the actual name of an error class or just a choosen identifier for this kind of error.\
   * Can be used to analyze the error result programmatically.
   */
  name: ErrorName
  /**
   * Human readable message. Can for example be used for the logging and debugging purposes
   */
  message?: string
}
/**
 * The error result of a (async. or sync.) operation, function, method call or the like.\
 * It is just informational, i.e. it has no data appended.
 */
export type ErrorResult<ErrorName extends string = string> = _BaseErrorResult<ErrorName>
/**
 * Canonical result object of an API call which resulted in an error and has no data as response
 */
export type ApiErrorResult<ErrorName extends string = string> = ErrorResult<ErrorName> & WithStatusCode<ErrorCode>
/**
 * The error result of a (async. or sync.) operation, function, method call or the like containing the result `data`.
 */
export type ErrorDataResult<ErrorData, ErrorName extends string = string> = _BaseErrorResult<ErrorName> &
  _DataObject<ErrorData>
/**
 * Canonical result object of an API call which was successful and has `data` in its response
 */
export type ApiErrorDataResult<ErrorData, ErrorName extends string = string> = ErrorDataResult<ErrorData, ErrorName> &
  WithStatusCode<ErrorCode>

export type ApiResult<Data, ErrorData = unknown, ErrorName extends string = string> =
  | ApiSuccessInformationResult
  | ApiSuccessDataResult<Data>
  | ApiErrorResult<ErrorName>
  | ApiErrorDataResult<ErrorData, ErrorName>
