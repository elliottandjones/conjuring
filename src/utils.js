function randomRoll(faces) {
  return Math.floor(Math.random() * faces) + 1
}

function validateString(string) {
  if (!string || !string.trim()) return false
  return string.trim()
}

export const calculateRoll = value => {
  let validValue = validateString(value)

  return validValue
}
