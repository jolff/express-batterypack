// TEST @middleware.precontroller requireContentType: different type, test failure response, test success response
// TEST @middleware.zod-validation validateBody: req in controller has right type, test failure response, test success response
import dotenv from "dotenv"
import assert from "assert"

dotenv.config({
  path: "tests/test.env",
})
import * as app from "../utils/create-app"
import { respond } from "../../src/response"
import { AxiosError, AxiosInstance } from "axios"
import axios from "axios"
import { middleware } from "../../src"
import e from "express"

let client: AxiosInstance = axios.create()
const body = { foo: "bar" }
const successResponse = {
  success: true,
  status: 200,
  data: {
    foo: "bar",
  },
}

describe("middleware", () => {
  describe("pre-controller", () => {
    before(async () => {
      await app.startApp(
        async (app) => {
          const respondWithBody = (req: e.Request, res: e.Response) => {
            return respond(res, {
              success: true,
              status: 200,
              data: req.body,
            })
          }
          app.post(
            "/hasContentType-json",
            middleware.preController.hasContentType("application/json"),
            e.json(),
            respondWithBody
          )
          app.post("/hasContentType-html", middleware.preController.hasContentType("text/html"), respondWithBody)
          app.post("/hasBody-ok", e.json(), middleware.preController.hasBody, respondWithBody)
          app.post("/hasBody-fail", middleware.preController.hasBody, respondWithBody)
          app.post(
            "/requireJSONWithOptions",
            middleware.preController.requireJSONWithConfig({ strict: true }),
            respondWithBody
          )
          app.post("/requireJSON", middleware.preController.requireJSON, respondWithBody)
        },
        { json: false }
      )
      client = app.getClient()
    })

    describe("#hasContentType", () => {
      it("should go to the next controller if Content-Type matches", async () => {
        //
        const jsonResponse = await client.post("/hasContentType-json", body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        assert.strictEqual(jsonResponse.status, 200)
        assert.deepStrictEqual(jsonResponse.data, successResponse)
        const htmlResponse = await client.post("/hasContentType-html", body, {
          headers: {
            "Content-Type": "text/html",
          },
        })
        assert.strictEqual(htmlResponse.status, 200)
      })
      it("should go to the next controller if a paramater is included in the Content-Type", async () => {
        throw new Error("Test not implemented")
      })
      it("should respond with an error if Content-Type does not match", async () => {
        throw new Error("Test not implemented")
      })
    })
    describe("#hasBody", () => {
      it("should go to the next controller if there is a body", async () => {
        throw new Error("Test not implemented")
      })
      it("should respond with an error if there is no body", async () => {
        throw new Error("Test not implemented")
      })
    })
    describe("#requireJSONWithOptions", () => {
      it("should go to the next controller if Content-Type is right and there is a JSON body", async () => {
        throw new Error("Test not implemented")
      })
      it("should respond with an error if the Content-Type is not 'application/json'", async () => {
        throw new Error("Test not implemented")
      })
      it("should respond with an error if there is no JSON body", async () => {
        throw new Error("Test not implemented")
      })
    })
    describe("#requireJSON", () => {
      it("should go to the next controller if Content-Type is right and there is a JSON body", async () => {
        throw new Error("Test not implemented")
      })
      it("should respond with an error if the Content-Type is not 'application/json'", async () => {
        throw new Error("Test not implemented")
      })
      it("should respond with an error if there is no JSON body", async () => {
        throw new Error("Test not implemented")
      })
    })

    after(async () => {
      await app.stopApp()
    })
  })
})
