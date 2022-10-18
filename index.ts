import express from "express";
import { checkArguments, checkBmi, calculateBmi, type Bmi, type BmiInfo } from "./bmiCalculator";
import {
  checkArgumentsCalculator,
  calculateExercices,
  type WeekHours,
  type Target,
  WeekHoursReport,
} from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = checkArguments(Number(req.query.height), Number(req.query.weight));
    const bmi: Bmi = calculateBmi(height, weight);
    const bmiInfo: BmiInfo = checkBmi(bmi);

    res.send({ height, weight, bmi, bmiInfo });
  } catch (err) {
    const message = "An error occured, please check your parameters";
    if (err instanceof Error) {
      res.status(400).json({ error: `malformatted parameters: ${err.message}` });
    } else {
      res.status(500).json({ error: message });
    }
  }
});

app.post("/exercices", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercices: WeekHours = req.body.daily_exercices;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: Target = req.body.target;

  try {
    checkArgumentsCalculator(daily_exercices, target);
    const report: WeekHoursReport = calculateExercices(daily_exercices, target);
    res.status(200).json(report);
  } catch (err) {
    const message = "An error occured, please check your parameters";
    if (err instanceof Error) {
      res.status(400).json({ error: `malformatted parameters: ${err.message}` });
    } else {
      res.status(500).json({ error: message });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
