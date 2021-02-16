var foo = -1;
// let sse = safa;
const funtoosh = () => {
  switch (foo) {
  case -1:
    return -1;
    // break; // This is actually unreachable code in this line coz after return statement nothing executes. Program control gets back to the owner.
  case 0: // foo is 0 so criteria met here so this block will run
    return 0;
    // NOTE: the forgotten break would have been here
  case 1: // no break statement in 'case 0:' so this case will run as well
    return 1;
    // break; // it encounters this break so will not continue into 'case 2:'
  case 2:
    return 2;
    // break;
  default:
    return 'default';
  }
};
console.log(funtoosh());
