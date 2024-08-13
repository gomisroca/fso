interface bmiValues {
  height: number;
  weight: number;
}

const parseBMIArgs = (args: string[]): bmiValues => {
  if (args.length !== 4) throw new Error("Invalid number of arguments");
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Invalid arguments");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / height**2) * 10000;
  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight range";
  } else {
    return "Obese range";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseBMIArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    console.log(errorMessage);
  }
}