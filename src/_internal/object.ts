import dotenv from "dotenv"
dotenv.config()

/**
 * Merges two objects into one. The values of the `defaultObject` gets overwritten by the `customObject`
 * @param defaultObject The object which holds the default values
 * @param customObject The custom object to overwrite the default
 * @returns The merged object
 */
export function extendDefaultObject<C extends Record<string, any>>(defaultObject: C, customObject: Partial<C>): C {
  defaultObject = JSON.parse(JSON.stringify(defaultObject)) as C
  Object.assign(defaultObject, customObject)
  return defaultObject
}
