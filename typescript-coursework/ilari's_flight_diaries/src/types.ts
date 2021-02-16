export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;//Setting the type of the field as optional.
}