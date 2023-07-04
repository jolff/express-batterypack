export function logBox(content: string) {
  const length = content.length
  let topLine = "#"
  let middleLine = "#"
  for (let i = 2; i < length + 6; i++) {
    topLine += "#"
    middleLine += " "
  }
  topLine += "#"
  middleLine += "#"

  console.log("")
  console.log("")
  console.log(topLine)
  console.log(middleLine)
  console.log(`#  ${content.toUpperCase()}  #`)
  console.log(middleLine)
  console.log(topLine)
  console.log("")
}
