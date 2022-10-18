type WeekHours = number[]

interface WeekHoursReport {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercices = (weekHours: WeekHours): WeekHoursReport => {
  const periodLength = weekHours.length
  const trainingDays = weekHours.filter((d) => d > 0).length
  const average = weekHours.reduce((acc, d) => acc + d, 0) / periodLength
  const target = 2
  const rating = Math.round(average)
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

const myWeek: WeekHours = [3, 0, 2, 4.5, 0, 3, 1]

const report = calculateExercices(myWeek)
console.log(report)
