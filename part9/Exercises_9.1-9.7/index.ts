/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { calculateExercises, parseArguments } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
import express from 'express';

const app = express();
app.use(express.json());

type BMI_Response = {
	weight: number;
	height: number;
	bmi: string;
};

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight) {
		return res.json({
			error: 'not enough arguments'
		});
	}

	if (isNaN(Number(height)) || isNaN(Number(weight))) {
		return res.json({
			error: 'malformatted parameters'
		});
	}

	const bmi = calculateBmi(Number(height), Number(weight));
	const response: BMI_Response = {
		height: Number(height),
		weight: Number(weight),
		bmi
	};

	return res.json(response);
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { target, daily_exercises } = req.body;

	try {
		if (!target || !daily_exercises) {
			throw new Error('parameters missing');
		}

		if (isNaN(Number(target)) || !(daily_exercises instanceof Array)) {
			throw new Error('malformatted parameters');
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const { hoursTarget, hoursPerDay } = parseArguments([target, ...daily_exercises]);
		const result = calculateExercises(hoursTarget, hoursPerDay);
		return res.json(result);
	} catch (error: unknown) {
		let errorMessage = '';

		if (error instanceof Error) {
			errorMessage += error.message;
		}

		return res.json({
			error: errorMessage
		});
	}
});

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
