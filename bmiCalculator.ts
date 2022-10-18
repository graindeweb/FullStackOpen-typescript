type PhysicalData = {
  height: number
  weight: number
}

type Bmi = number

type bmiLevel = {
  low: number
  height: number
  info: string
}

type bmiLevelType = "underweight" | "normal" | "overweight" | "obese"

const bmiLevels = {
  underweight: { low: 0, high: 18.4, info: "you must eat more" },
  normal: { low: 18.5, high: 24.9, info: "healthy weight" },
  overweight: { low: 25.0, high: 39.9, info: "be careful..." },
  obese: { low: 40.0, high: 700, info: "you're so fat" },
}

const parseArguments = (args: string[]): PhysicalData => {
  if (process.argv.length != 4) throw Error("Please give just 2 arguments: height and weight")

  const height = Number(args[2])
  const weight = Number(args[3])
  if (isNaN(height) || isNaN(weight)) {
    throw Error("Please give your height in cm and your weight in kg")
  }

  if (height < 40 || height > 300) {
    throw Error("Please give your height between 50 and 300cm")
  }

  if (weight < 2 || weight > 700) {
    throw Error("Please give your weight between 2 and 700kg")
  }

  return { height, weight }
}

const calculateBmi = (height: number, weight: number): Bmi => {
  console.log(`Height: ${height}cm, Weight: ${weight}kg... Let's have a look to your BMI`)
  const bmi: number = weight / Math.pow(height * 0.01, 2)

  return bmi
}

const checkBmi = (bmi: Bmi): string => {
  for (const levelType in bmiLevels) {
    const type = levelType as bmiLevelType
    if (bmi >= bmiLevels[type].low && bmi <= bmiLevels[type].high) {
      return `You're ${type} (${bmiLevels[type].info})`
    } 
  }
}

try {
  const { weight, height } = parseArguments(process.argv)
  const bmi: Bmi = calculateBmi(height, weight)
  console.log("Your bmi : ", bmi)
  console.log("That means that ", checkBmi(bmi))
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log(err.message)
  } else {
    console.log("An error occured: ", err)
  }
}
