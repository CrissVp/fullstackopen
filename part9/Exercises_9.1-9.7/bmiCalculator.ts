type BMI =
	| 'Underweight (Severe thinness)'
	| 'Underweight (Moderate thinness)'
	| 'Underweight (Mild thinness)'
	| 'Normal (healthy weight)'
	| 'Overweight (Pre-obese)'
	| 'Obesity (Class I)'
	| 'Obesity (Class II)'
	| 'Obesity (Class III)';

type BMI_Inputs = {
	weight: number;
	height: number;
};

export const parseArguments = (): BMI_Inputs => {
	if (process.argv.length < 4) throw new Error('Not enough arguments');
	if (process.argv.length > 4) throw new Error('Too much arguments');

	const [height, weight] = process.argv.slice(2);

	if (isNaN(Number(weight)) || isNaN(Number(height))) {
		throw new Error('Provided values are not numbers!');
	}

	return { height: Number(height), weight: Number(weight) };
};

export const calculateBmi = (height: number, weight: number): BMI => {
	const result: number = (weight / Math.pow(height, 2)) * 10000;

	switch (true) {
		case result < 16.0:
			return 'Underweight (Severe thinness)';
		case result <= 16.9:
			return 'Underweight (Moderate thinness)';
		case result <= 18.4:
			return 'Underweight (Mild thinness)';
		case result <= 24.9:
			return 'Normal (healthy weight)';
		case result <= 29.9:
			return 'Overweight (Pre-obese)';
		case result <= 34.9:
			return 'Obesity (Class I)';
		case result <= 39.9:
			return 'Obesity (Class II)';
		default:
			return 'Obesity (Class III)';
	}
};

try {
	if (process.argv[1] !== 'index.ts') {
		const { height, weight } = parseArguments();
		console.log(calculateBmi(height, weight));
	}
} catch (error: unknown) {
	let errorMessage = 'Error: ';

	if (error instanceof Error) {
		errorMessage += error.message;
	}

	console.log(errorMessage);
}
