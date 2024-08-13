interface exerciseValues {
  target: number;
  exercises: number[];
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const parseExerciseArgs = (args: string[]): exerciseValues => {
  // There should be at least 4 arguments
  if (args.length < 4) throw new Error("Invalid number of arguments");
  
  // The first argument is the target
  const target = Number(args[2]);

  // The rest of the arguments are the exercises
  const exercises = args.slice(3).map(Number);

  return {
    target,
    exercises,
  };
};


export const calculateExercises = (target: number, exercises: number[]): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(ex => ex > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = "It didn't go so well... Don't give up!";
  if (success) {
    rating = 3;
    ratingDescription = "Excellent job!";
  }
  else if (trainingDays / periodLength > 0.6) {
    rating = 2;
    ratingDescription = "Needs improvement, almost there!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, exercises } = parseExerciseArgs(process.argv);
    console.log(calculateExercises(target, exercises));
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    console.log(errorMessage);
  }
}