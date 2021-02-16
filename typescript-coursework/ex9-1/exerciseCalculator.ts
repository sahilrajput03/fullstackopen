interface MyReturn { periodLength: number, trainingDays: number, success: boolean, rating: number, ratingDescription: string, target: number, average: number }

const calculateExercises = (hoursAtADayInWeek: number[], secondArg: number): MyReturn => {
  const trainingDays = hoursAtADayInWeek.filter(i => i != 0).length;
  const target = secondArg;
  const average = hoursAtADayInWeek.reduce((i, acc) => i + acc) / 7;
  const success = average > target || average == target;
  const rating = average > 2 ? 3 : average > 1 ? 2 : 1;
  const ratingDescription = ['bad', 'not too bad but could be better', 'good'];
  // console.log({ periodLength: hoursAtADayInWeek.length, trainingDays, success, rating, ratingDescription: ratingDescription[rating - 1], target, average })
  return { periodLength: hoursAtADayInWeek.length, trainingDays, success, rating, ratingDescription: ratingDescription[rating - 1], target, average };
};

const arrayTobePassed: number[] = [];
process.argv.forEach((t, i, arr) => {
  if (Number(i) > 1 && (i != arr.length - 1)) arrayTobePassed.push(Number(t));
});

// calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2) // With hardcoded input values
// calculateExercises(arrayTobePassed, Number(process.argv[process.argv.length - 1])) // With commandline arguments.
export default calculateExercises;