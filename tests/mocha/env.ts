// TEST @env crucialCheck
import dotenv from "dotenv"
import assert from "assert"

dotenv.config({
  path: "tests/test.env",
})

import { env } from "../../src"

describe("env", () => {
  describe("#getBooleanFromEnv", () => {
    it("should return `false` if env is not set and default value is not set", () => {
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNSET"), false)
    })
    it("should return default value if env is not set", () => {
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNSET", false), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNSET", true), true)
    })
    it("should return `true` if env is '1' or 'true'", () => {
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_TRUE_1"), true)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_TRUE_1", true), true)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_TRUE_1", false), true)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_TRUE_2"), true)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_TRUE_2", true), true)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_TRUE_2", false), true)
    })
    it("should return `false` if env is '0' or 'false'", () => {
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_FALSE_1"), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_FALSE_1", true), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_FALSE_1", false), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_FALSE_2"), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_FALSE_2", true), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_FALSE_2", false), false)
    })
    it("should return default value if env has an unknown value", () => {
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNKNOWN_1"), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNKNOWN_1", false), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNKNOWN_1", true), true)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNKNOWN_2"), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNKNOWN_2", false), false)
      assert.strictEqual(env.getBooleanFromEnv("EBP_TEST_BOOLEAN_UNKNOWN_2", true), true)
    })
  })
  describe("#getStringFromEnv", () => {
    it("should return empty string if env is not set and default value is not set", () => {
      assert.strictEqual(env.getStringFromEnv("EBP_TEST_STRING_UNSET"), "")
    })
    it("should return default value if env is not set", () => {
      assert.strictEqual(env.getStringFromEnv("EBP_TEST_STRING_UNSET", "ebp"), "ebp")
    })
    it("should return right value if env is set", () => {
      assert.strictEqual(env.getStringFromEnv("EBP_TEST_STRING"), "ebp")
      assert.strictEqual(env.getStringFromEnv("EBP_TEST_STRING", "foo"), "ebp")
    })
  })
  describe("#getStringArrayFromEnv", () => {
    it("should return empty array if env is not set and default value is not set", () => {
      assert.deepStrictEqual(env.getStringArrayFromEnv("EBP_TEST_ARRAY_UNSET", ["e", "b", "p"]), [])
    })
    it("should return default value if env is not set", () => {
      assert.deepStrictEqual(env.getStringArrayFromEnv("EBP_TEST_ARRAY_UNSET", ["e", "b", "p"], ["e"]), ["e"])
    })
    it("should return array with only allowed values and handle spacing issues", () => {
      assert.deepStrictEqual(
        env.getStringArrayFromEnv("EBP_TEST_ARRAY_1", ["e", "b", "p"]).sort(),
        ["e", "b", "p"].sort()
      )
      assert.deepStrictEqual(env.getStringArrayFromEnv("EBP_TEST_ARRAY_2", ["e", "b", "p"]).sort(), [].sort())
      assert.deepStrictEqual(env.getStringArrayFromEnv("EBP_TEST_ARRAY_3", ["e", "b", "p"]).sort(), ["b"].sort())
      assert.deepStrictEqual(env.getStringArrayFromEnv("EBP_TEST_ARRAY_4", ["e", "b", "p"]).sort(), ["b"].sort())
    })
  })
})
