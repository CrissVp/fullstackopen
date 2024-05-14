import { NewDiaryEntry, Visibility, Weather } from '../types';

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
		const newDiaryEntry: NewDiaryEntry = {
			date: parseDate(object.date),
			comment: parseComment(object.comment),
			weather: parseWeather(object.weather),
			visibility: parseVisibility(object.visibility)
		};

		return newDiaryEntry;
	}

	throw new Error('Incorrect data: some fields are missing');
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isWeather = (param: string): param is Weather => {
	return Object.values(Weather)
		.map((v) => v.toString())
		.includes(param);
};

const isVisibility = (param: string): param is Visibility => {
	return Object.values(Visibility)
		.map((v) => v.toString())
		.includes(param);
};

const parseComment = (comment: unknown): string => {
	if (!isString(comment) || comment === '') {
		throw new Error('Incorrect or missing comment');
	}

	return comment;
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}

	return date;
};

const parseWeather = (weather: unknown): Weather => {
	if (!isString(weather) || !isWeather(weather)) {
		throw new Error('Incorrect or missing weather: ' + weather);
	}

	return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
	if (!isString(visibility) || !isVisibility(visibility)) {
		throw new Error('Incorrect or missing visibility: ' + visibility);
	}

	return visibility;
};

export default toNewDiaryEntry;
