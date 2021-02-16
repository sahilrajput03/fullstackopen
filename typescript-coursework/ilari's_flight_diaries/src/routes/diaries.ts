import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';
import { isError } from 'util';

const router = express.Router();

// interface BOOMDiaryEntry {
//   id: number;
//   date: string;
//   weather: 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
//   visibility: 'great' | 'good' | 'ok' | 'poor';
//   comment?: string;//Setting the type of the field as optional.
// }


router.post('/', (req, res) => {
  // const { date, weather, visibility, comment } = req.body;
  // const newDiaryEntry = diaryService.addEntry(
  //   {
  //     date,
  //     weather,
  //     visibility,
  //     comment,
  //   } );
  // res.json(newDiaryEntry);

  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addEntry(newDiaryEntry);
    // const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (e) {
    // const message2 = e.message; // This will give error as unsafe assignment of an any value.
    // const message = (e as Error).message; // This works flawlessly.
    res.status(400).send((e as Error).message); // This works good102.
    // res.status(400).send(e instanceof Error ? e.message : "no message"); // This works good101.
    // res.status(400).send(e instanceof Error ? e.message : "no message"); // This works good100.
    // res.status(400).send(isError(e) ? e.message : "No message"); // This works good0.
    // e instanceof Error && res.status(400).send(e.message);  // This works good1.
    // isError(e) && res.status(400).send(e.message); // This works good2.

    // Old coders style below- //This works good3.
    // if(isError(e)){
    //   res.status(400).send(e.message);
    // }
  }

});


router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  // res.send('Fetching all diaries!');
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(diaryService.getNonSensitiveEntries(), null, 4));
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;