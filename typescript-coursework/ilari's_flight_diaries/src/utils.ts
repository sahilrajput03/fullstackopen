/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewDiaryEntry } from './types';

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + String(visibility));
  }
  return visibility;
};

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

// const isWeather = (str: any): str is Weather => {
//   return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
// };

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + String(weather));
  }
  return weather;
};

// const parseWeather = (weather: any): Weather => {
//   if (!weather || !isString(weather) || !isWeather(weather)) {
//     throw new Error('Incorrect or missing weather: ' + String(weather));
//   }
//   return weather;
// };

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + String(date));
  }
  return date;
};

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  };
};

// const toNewDiaryEntry = (object: any): NewDiaryEntry => {
//   const { date, weather, visibility, comment } = object;
//   const newEntry: NewDiaryEntry = {
//     date,
//     weather,
//     visibility,
//     comment,
//   };
//   return newEntry;
// };

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment: ' + String(comment));
  }

  return comment;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewDiaryEntry;