import assert from "assert"

import { extendDefaultObject } from "../../src/_internal/object"

describe("_internal/object", () => {
  describe("#extendDefaultObject", () => {
    it("should generate correct objects from a default and custom object", () => {
      const defaultObject = {
        foo: "bar",
        baz: 3,
      }
      assert.deepStrictEqual(extendDefaultObject(defaultObject, { foo: "baz" }), { foo: "baz", baz: 3 })
      assert.deepStrictEqual(extendDefaultObject(defaultObject, { baz: 2 }), { foo: "bar", baz: 2 })
      assert.deepStrictEqual(extendDefaultObject(defaultObject, { foo: "baz", baz: 2 }), { foo: "baz", baz: 2 })
      assert.deepStrictEqual(extendDefaultObject(defaultObject, {}), { foo: "bar", baz: 3 })
    })
    it("should not mutate the original objects passed as parameters", () => {
      const defaultObject = {
        foo: "bar",
        baz: 3,
      }
      const customObject = {
        foo: "baz",
      }
      extendDefaultObject(defaultObject, customObject)
      assert.deepStrictEqual(defaultObject, {
        foo: "bar",
        baz: 3,
      })
      assert.deepStrictEqual(customObject, {
        foo: "baz",
      })
    })
  })
})
