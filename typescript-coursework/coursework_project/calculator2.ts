import { isArray, isError } from 'util';

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  // const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  console.log('isNaN methos->', isNaN(Number(args[2])));
  console.log('isNaN methos->', isNaN(22));
  console.log('isArray method->', isArray([2, 3, 45, 6, 29, 23, 23, 22, 23, 332]));
  console.log('isArray method->', isArray([2, 3, 45, 6, 29, 23, 23, 22, 23, 332]));
  // const sf = [2, 34, 5, 6, 6];

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (e) {
  console.log('Error, something bad happened, message: ', isError(e) && e.message);
}