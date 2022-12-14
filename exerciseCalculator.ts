export type WeekHours = number[];
export type Target = number;

export interface CalculateParams {
  weekHours: WeekHours
  target: Target
}

export interface WeekHoursReport {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const checkArgumentsCalculator = (weekHours: WeekHours, target: Target): CalculateParams => {
  if (weekHours.length === 0) {
    throw Error("Please give at least a day in daily_exercices!");
  }
  if (weekHours.some((d) => isNaN(d) || d > 24)) {
    throw Error("Please give time per day in hours (max 24h)");
  }
  if (target === 0) {
    throw Error("Please be ambitious: choose a target above 0");
  }

  return { target, weekHours };
};

const parseArgumentsCalculator = (args: string[]): CalculateParams => {
  if (args.length < 4) throw Error("Please give some hours per day. First Element is target");

  const weekHours: WeekHours = args.slice(2).map((d) => Number(d));
  const target: Target = weekHours.shift() || 0;

  return checkArgumentsCalculator(weekHours, target);
};

export const calculateExercices = (weekHours: WeekHours, target: Target): WeekHoursReport => {
  const periodLength = weekHours.length;
  const trainingDays = weekHours.filter((d) => d > 0).length;
  const average = weekHours.reduce((acc, d) => acc + d, 0) / periodLength;
  const realRating = Math.round((average * 100) / target / 33);
  const rating = realRating > 3 ? 3 : realRating;
  const success = rating > target;
  const ratingDescription = [
    "so close to nothing",
    "better than nothing",
    "not to bad but could be better",
    "good job!",
  ][rating];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, weekHours } = parseArgumentsCalculator(process.argv);
  const report = calculateExercices(weekHours, target);
  console.log(report);
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log(err.message);
  } else {
    console.log("An error occured: ", err);
  }
}
