function roll(sides:number): number {
  return Math.floor(Math.random() * sides) + 1
}

function validateString(str: string): boolean {
  if (!str?.trim()) {
    console.log('str parameter is invalid')
    return false
  }
  return true
}

function validateDiceDataArray(arr: any[]) {
  if (arr?.length !== 2) {
    console.log('arr parameter is invalid')
    return false
  }
  return true
}

export const calculateRoll = (value: string) => {
  let isValid = validateString(value)
  let rollSum = 0
  const rolls = []
  if (!isValid) {
    console.log('cannot calculate roll')
    return
  }
  const data = value.slice().split('d')
  if (!validateDiceDataArray(data)) {
    console.log('cannot calculate roll')
    return
  }
  let numberOfDice = parseInt(data[0])
  let numberOfSides = parseInt(data[1])

  for (let i = 0; i < numberOfDice; i++) {
    rolls[i] = roll(numberOfSides)
  }
  for (let j = 0; j < rolls?.length; j++) {
    rollSum += rolls[j]
  }

  return { rollSum, rolls }
}
