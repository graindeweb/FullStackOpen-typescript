type WeekHours = number[]
type Target = number

interface CalculateParams {
  weekHours: WeekHours
  target: Target
}

interface WeekHoursReport {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseArgumentsCalculator = (args: string[]): CalculateParams => {
  if (process.argv.length < 3) throw Error("Please give some hours per day")

  const weekHours: WeekHours = process.argv.slice(2).map((d) => Number(d))

  if (weekHours.some((d) => isNaN(d) || d > 24)) {
    throw Error("Please give time per day in hours (max 24h)")
  }
  const target: Target = weekHours.shift()
  if (target === 0) {
    throw Error("Please be ambitious: choose a target above 0")
  }

  return { target, weekHours }
}

const calculateExercices = (weekHours: WeekHours, target: Target): WeekHoursReport => {
  const periodLength = weekHours.length
  const trainingDays = weekHours.filter((d) => d > 0).length
  const average = weekHours.reduce((acc, d) => acc + d, 0) / periodLength
  const realRating = Math.round(((average * 100) / target) / 33)
  const rating = realRating > 3 ? 3 : realRating
  const success = rating > target
  const ratingDescription = [
    "so close to nothing",
    "better than nothing",
    "not to bad but could be better",
    "good job!",
  ][rating]

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const { target, weekHours } = parseArgumentsCalculator(process.argv)
  const report = calculateExercices(weekHours, target)
  console.log(report)
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log(err.message)
  } else {
    console.log("An error occured: ", err)
  }
}
