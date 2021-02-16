import express from 'express';
import diaryRouter from './routes/diaries';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);


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