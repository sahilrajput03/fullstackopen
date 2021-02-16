import { isError } from 'util';
// You need to import this via, quic fix settings on the error. This could be either fetched from @tyeps/node or @types/express

type Operation = 'multiply' | 'add' | 'divide';
type Result = string | number;
const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
  case 'multiply':
    return a * b;
  case 'divide':
    if (b === 0) throw new Error('Can\'t divide by 0!');
    return a / b;
  case 'add':
    return a + b;
  default:
    throw new Error('Operation is not multiply, add or divide!');
  }
};

try {
  console.log(calculator(Number(process.argv[2]), Number(process.argv[3]), 'multiply'));
  // console.log(process.argv[2])
} catch (e) {

  // const message = isError(e);
  // console.log('Something went wrong, error message: ', isError(e) && e.message );
  // const message = (e).message;
  // const message = (e).message;
  // const message = (e as Error).message;

  console.log('Something went wrong, error message: ', isError(e) && e.message);
}
