interface ExerciseDetails {
	ratingDescription: string;
	periodLength: number;
	trainingDays: number;
	success: boolean;
	average: number;
	rating: number;
	target: number;
}

type Exercises_Inputs = {
	hoursPerDay: number[];
	hoursTarget: number;
};

export const parseArguments = (args: string[]): Exercises_Inputs => {
	const [hoursTarget, ...hoursPerDay] = args;

	if (!hoursTarget || hoursPerDay.length === 0) {
		throw new Error('not enough arguments');
	}

	const validType = hoursPerDay.every((arg) => !isNaN(Number(arg)));

	if (isNaN(Number(hoursTarget)) || !validType) {
		throw new Error('provided values are not numbers');
	}

	return {
		hoursTarget: Number(hoursTarget),
		hoursPerDay: hoursPerDay.map((arg) => Number(arg))
	};
};

const RATING_MAX = 3;

export const calculateExercises = (hoursTarget: number, hoursPerDay: number[]): ExerciseDetails => {
	const average = hoursPerDay.reduce((acc, curr) => (acc += curr), 0) / hoursPerDay.length;
	const dayPercentage = RATING_MAX / hoursPerDay.length;

	const rating = hoursPerDay.reduce((acc, curr) => {
		let dayRating = curr * (dayPercentage / hoursTarget);
		if (dayRating > dayPercentage) dayRating = dayPercentage;
		acc += dayRating;
		return acc;
	}, 0);

	let ratingDescription = '';

	switch (true) {
		case rating <= 1.5:
			ratingDescription = 'Bad';
			break;
		case rating <= 2:
			ratingDescription = 'Could be better';
			break;
		case rating <= 2.5:
			ratingDescription = 'Not bad';
			break;
		case rating > 2.5:
			ratingDescription = 'Good';
			break;
	}

	return {
		trainingDays: hoursPerDay.filter((day) => day !== 0).length,
		success: hoursPerDay.every((day) => day >= hoursTarget),
		periodLength: hoursPerDay.length,
		rating: Number(rating.toFixed(2)),
		target: hoursTarget,
		ratingDescription,
		average
	};
};

try {
	if (process.argv[1] !== 'index.ts') {
		const { hoursTarget, hoursPerDay } = parseArguments(process.argv.slice(2));
		console.log(calculateExercises(hoursTarget, hoursPerDay));
	}
} catch (error: unknown) {
	let errorMessage = 'Error: ';

	if (error instanceof Error) {
		errorMessage += error.message;
	}

	console.log(errorMessage);
}
