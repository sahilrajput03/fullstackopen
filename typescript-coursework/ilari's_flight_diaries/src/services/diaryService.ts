import diaries from '../../data/diaries'; // This is some coool code.
// import diaryData from '../../data/diaries.json'; //old coders style, made to use via type assertions(the right handi side types settings)

import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types';

// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>; // To use only if we are certain we know what we are doing, also this line doesn't get the full power of typescript.

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};


// OLDER PARAMTER DEFINITIONS date: string, weather: Weather, visibility: Visibility, comment: string
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = (
  entry: NewDiaryEntry
): DiaryEntry => {

  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};


export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
};