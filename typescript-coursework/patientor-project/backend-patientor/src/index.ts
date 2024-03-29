import express from 'express';
// import diaryRouter from './routes/diaries';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';
import console from 'console';

const app = express();

app.use(cors());
app.use(express.json());
// const ss = "unused";
// Whenever you see editor's eslint not working or detecting issues/errors,
//  it'll be fixed when you run `npm run lintWindows` script from command line.
const PORT = 3001;
// console.log('sahil');

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// app.use('/api/diaries', diaryRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import express from 'express';
// const app = express();
// import cors from 'cors';

// app.use(cors());
// app.use(express.json());

// const PORT = 3001;

// app.get('/api/ping', (_req, res) => {
//   console.log('someone pinged here');
//   res.send('pong');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
