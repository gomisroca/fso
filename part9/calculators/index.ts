import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', function(req, res){
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send('Malformed Parameters');
    return;
  }
  const bmi = calculateBmi(height, weight);
  res.json({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

type exercisesRequest = {
  target: number;
  daily_exercises: number[];
};

app.post('/exercises', function(req, res){
  const data: exercisesRequest = req.body as exercisesRequest;
  if (!data.target || !data.daily_exercises) {
    res.send('Parameters Missing');
    return;
  }
  if (!Array.isArray(data.daily_exercises) || !data.daily_exercises.every(element => typeof element === 'number')) {
    res.send('Malformed Parameters');
    return;
  }
  const exercises = data.daily_exercises.map(Number);
  
  const target = Number(data.target);
  if (isNaN(target)) {
    res.send('Malformed Parameters');
    return;
  }

  const result = calculateExercises(target, exercises);
  res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});