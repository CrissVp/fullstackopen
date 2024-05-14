import { Gender, NewPatient } from '../../types';
import { isDate, isString } from '../utils';

const parseNewPatient = (params: unknown): NewPatient => {
	if (!params || typeof params !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if (
		'name' in params &&
		'dateOfBirth' in params &&
		'ssn' in params &&
		'gender' in params &&
		'occupation' in params
	) {
		const newPatient: NewPatient = {
			dateOfBirth: parseDateOfBirth(params.dateOfBirth),
			occupation: parseOccupation(params.occupation),
			gender: parseGender(params.gender),
			name: parseName(params.name),
			ssn: parseSSN(params.ssn)
		};

		return newPatient;
	}

	throw new Error('Incorrect data: some fields are missing');
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const parseName = (name: unknown): string => {
	if (!isString(name) || !name) {
		throw new Error('Incorrect value for `name`');
	}

	return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!isString(dateOfBirth) || !dateOfBirth || !isDate(dateOfBirth)) {
		throw new Error('Incorrect value for `dateOfBirth`');
	}

	return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !gender || !isGender(gender)) {
		throw new Error('Incorrect value for `gender`');
	}

	return gender;
};

const parseSSN = (ssn: unknown): string => {
	if (!isString(ssn) || !ssn) {
		throw new Error('Incorrect value for `ssn`');
	}

	return ssn;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation) || !occupation) {
		throw new Error('Incorrect value for `occupation`');
	}

	return occupation;
};

export default parseNewPatient;
