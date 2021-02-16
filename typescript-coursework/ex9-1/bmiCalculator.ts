const calculateBmi = (weightInKg: number, height: number): string => {
  //weight in kgs and height in centimetres.
  const heightInMetres = height / 100
  const divisor = heightInMetres * heightInMetres
  const result = ((weightInKg) / divisor)
  let code: number = 10
  const weightArray = [15, 16, 18.5, 25, 30, 35, 40]
  weightArray.find((t, i) => {
    if (result < t) {
      code = i + 1
      return true //This gets us out of the loop.
    } else {
      return false
    }
  })
  /*   
    // Bullshit 1.
    // const upperLimit = (limit: number): boolean => Boolean(result < limit || result == limit);
    // upperLimit(15) ? code = 1 : upperLimit(16) ? code = 2 : upperLimit(18.5) ? code = 3 : upperLimit(25) ? code = 4 : upperLimit(30) ? code = 5 : upperLimit(35) ? code = 6 : upperLimit(40) ? code = 7 : result > 40? code = 8: false
  
    //Bullshit 2.
    // (result < 15 || result == 15) ? code = 1 : (result < 16 || result == 16) ? code = 2 : (result < 18.5 || result == 18.5) ? code = 3 : (result < 25 || result == 25) ? code = 4 : (result < 30 || result == 30) ? code = 5 : (result < 35 || result == 35) ? code = 6 : (result < 40 || result == 40) ? code = 7 : (result > 40) ? code = 8 : false
   */
  switch (code) {
    case 1:
      return "Very severely underweight"
    case 2:
      return "Severely underweight"
    case 3:
      return "Underweight"
    case 4:
      return "Normal (healthy weight)"
    case 5:
      return "Overweight"
    case 6:
      return "Obese Class I (Moderately obese)"
    case 7:
      return "Obese Class II (Severely obese)	"
    case 8:
      return "Obese Class III (Very severely obese)"
    default:
      return "Data out of range"
  }
}

export default calculateBmi
// console.log(calculateBmi(74, 180)) // With hardcoded input values
// console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3]))) // With commandline arguments.