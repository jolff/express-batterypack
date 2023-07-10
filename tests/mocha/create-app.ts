import dotenv from "dotenv"
import assert from "assert"

dotenv.config({
  path: "tests/test.env",
})

import * as app from "../utils/create-app"
import { respond } from "../../src/response"
import { AxiosError, AxiosInstance } from "axios"
import axios from "axios"

let client: AxiosInstance = axios.create()

describe("create-app", async function () {
  describe("#createAppAndListen", function () {
    describe("with default settings", async function () {
      before(async function initApp() {
        await app.startApp(async (app) => {
          app.get("/foo", (req, res) => {
            respond(res, {
              success: true,
              status: 200,
              data: { foo: "bar" },
            })
          })
          app.post("/body", (req, res) => {
            respond(res, {
              success: true,
              status: 200,
              data: req.body,
            })
          })
        })
        client = app.getClient()
      })
      it("should parse JSON bodys", async () => {
        const response = await client.post("/body", { foo: "bar" })
        assert.deepStrictEqual(response.data, { success: true, status: 200, data: { foo: "bar" } })
      })
      it("should have a health endpoint which responds correctly", async () => {
        const response = await client.get("/health")
        assert.strictEqual(response.status, 200)
        assert.deepStrictEqual(response.data, { status: 200, success: true })
      })
      it("should have a standard 404 handler which responds correctly", async () => {
        try {
          await client.get("/missing-route-1")
          throw new Error("Client should not respond with success")
        } catch (e) {
          if (e instanceof Error && e.message === "Client should not respond with success") throw e
          const err = e as AxiosError
          assert.strictEqual(err.response?.status, 404)
          assert.deepStrictEqual(err.response?.data, {
            status: 404,
            success: false,
            name: "not-found",
            message: "Endpoint /missing-route-1 does not exist.",
          })
        }
        try {
          await client.get("/missing-route/2")
          throw new Error("Client should not respond with success")
        } catch (e) {
          if (e instanceof Error && e.message === "Client should not respond with success") throw e
          const err = e as AxiosError
          assert.strictEqual(err.response?.status, 404)
          assert.deepStrictEqual(err.response?.data, {
            status: 404,
            success: false,
            name: "not-found",
            message: "Endpoint /missing-route/2 does not exist.",
          })
        }
      })
      after(async function stopApp() {
        await app.stopApp()
      })
    })
    describe("with custom settings", async function () {
      before(async function initApp() {
        await app.startApp(
          async (app) => {
            app.get("/foo", (req, res) => {
              respond(res, {
                success: true,
                status: 200,
                data: { foo: "bar" },
              })
            })
            app.post("/body", (req, res) => {
              respond(res, {
                success: true,
                status: 200,
                data: req.body,
              })
            })
          },
          { json: false, add404Handler: false, addHealthEndpoint: false }
        )
        client = app.getClient()
      })
      it("should NOT parse JSON bodys", async () => {
        const response = await client.post("/body", { foo: "bar" })
        assert.deepStrictEqual(response.data, { success: true, status: 200 })
      })
      it("should NOT have a health endpoint which responds correctly", async () => {
        try {
          await client.get("/health")
          throw new Error("Client should not respond with success")
        } catch (e) {
          if (e instanceof Error && e.message === "Client should not respond with success") throw e
          const err = e as AxiosError
          assert.strictEqual(err.response?.status, 404)
        }
      })
      it("should NOT have a standard 404 handler which responds correctly", async () => {
        try {
          await client.get("/missing-route")
          throw new Error("Client should not respond with success")
        } catch (e) {
          if (e instanceof Error && e.message === "Client should not respond with success") throw e
          const err = e as AxiosError
          assert.strictEqual(err.response?.status, 404)
          assert.strictEqual(typeof err.response?.data, "string")
          assert(typeof err.response?.data === "string" && err.response?.data.startsWith("<!DOCTYPE"))
        }
      })
      after(async function stopApp() {
        await app.stopApp()
      })
    })
    describe("with bodyParser.OptionsJson", async function () {
      before(async function initApp() {
        await app.startApp(
          async (app) => {
            app.get("/foo", (req, res) => {
              respond(res, {
                success: true,
                status: 200,
                data: { foo: "bar" },
              })
            })
            app.post("/body", (req, res) => {
              respond(res, {
                success: true,
                status: 200,
                data: req.body,
              })
            })
          },
          { json: { strict: true }, add404Handler: false, addHealthEndpoint: false }
        )
        client = app.getClient()
      })
      it("should parse JSON bodys when used with bodyParser.OptionsJson", async () => {
        const response = await client.post("/body", { foo: "bar" })
        assert.deepStrictEqual(response.data, { success: true, status: 200, data: { foo: "bar" } })
      })
      after(async function stopApp() {
        await app.stopApp()
      })
    })
  })
})
