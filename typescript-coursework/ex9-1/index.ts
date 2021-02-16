// I have imported all types using npm link @types (Athough this command gives error but will link the complete @types folder from global path.:D)
import express from 'express';
// const express = require('express')
import calculator from './exerciseCalculator';
import calculateBmi from './bmiCalculator';
import console from 'console';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res: { send: (arg0: string) => void; }) => {
  res.send('pongiiiionnnnin hellnon');
});

app.get('/bmi', (req, res) => {
  //  This is the request: http://localhost:3003/bmi?height=180&weight=72
  const { height, weight } = req.query;
  console.log(height, weight);
  // let objectToSend: object = {} // This is ALLOWED intypescript.
  const myObject = { height: height, weight: weight, bmi: calculateBmi(Number(weight), Number(height)) };
  res.header('Content-Type', 'application/json'); // You need to do ctrl+shift+f5 to see its effect.
  res.send(JSON.stringify(myObject, null, 4));
});


app.post('/calculator', (req, res) => {
  interface MyRequest {
    target: number,
    daily_exercises: number[]
  }

  const passedRequest: MyRequest = req.body as MyRequest;
  if (!passedRequest.target || !passedRequest.daily_exercises) {
    return res.send({ error: 'parameters missing' });
  }
  else if (passedRequest.daily_exercises.length != 7 || passedRequest.daily_exercises.some((t: number) => isNaN(t)) || isNaN(passedRequest.target)) {
    return res.send({ error: 'malformatted parameters' });
  }
  return res.send(calculator(passedRequest.daily_exercises, passedRequest.target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});