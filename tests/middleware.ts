import * as h from "./_helper"
export default async function () {
  h.logBox("MIDDLEWARE")
  return await Promise.resolve()
}
