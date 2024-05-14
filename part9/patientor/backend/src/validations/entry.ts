import { Diagnosis, EntryWithouId, HealthCheckRating } from '../../types';
import { isDate, isNumber, isString } from '../utils';

const parseNewEntry = (params: unknown): EntryWithouId => {
	if (!params || typeof params !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('type' in params && 'date' in params && 'description' in params && 'specialist' in params) {
		if (params.type === 'Hospital') {
			const newEntry: EntryWithouId = {
				type: params.type,
				date: parseDate(params.date),
				description: parseDescription(params.description),
				specialist: parseSpecialist(params.specialist),
				discharge: parseDischarge(params),
				diagnosisCodes: parseDiagnosisCodes(params)
			};

			return newEntry;
		}

		if (params.type === 'HealthCheck') {
			const newEntry: EntryWithouId = {
				type: params.type,
				date: parseDate(params.date),
				description: parseDescription(params.description),
				specialist: parseSpecialist(params.specialist),
				healthCheckRating: parseHealthCheckRating(params),
				diagnosisCodes: parseDiagnosisCodes(params)
			};

			return newEntry;
		}

		if (params.type === 'OccupationalHealthcare') {
			const newEntry: EntryWithouId = {
				type: params.type,
				date: parseDate(params.date),
				description: parseDescription(params.description),
				specialist: parseSpecialist(params.specialist),
				employerName: parseEmployerName(params),
				sickLeave: parseSickLeave(params),
				diagnosisCodes: parseDiagnosisCodes(params)
			};

			return newEntry;
		}
	}

	throw new Error('Missing required fields for entry');
};

const isHealthRating = (rating: number): rating is HealthCheckRating => {
	return Object.values(HealthCheckRating)
		.map((v) => v)
		.includes(rating);
};

const isDiagnosisCodesArray = (
	diagnosisCodes: unknown[]
): diagnosisCodes is Array<Diagnosis['code']> => {
	return diagnosisCodes.every((p) => isString(p));
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !date || !isDate(date)) {
		throw new Error('Incorrect value for `date`');
	}

	return date;
};

const parseDescription = (description: unknown): string => {
	if (!isString(description) || !description) {
		throw new Error('Incorrect value for `description`');
	}

	return description;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!isString(specialist) || !specialist) {
		throw new Error('Incorrect value for `specialist`');
	}

	return specialist;
};

const parseDischarge = (params: object): { date: string; criteria: string } => {
	if (
		!('discharge' in params) ||
		params.discharge === null ||
		typeof params.discharge !== 'object' ||
		!('date' in params.discharge) ||
		!('criteria' in params.discharge)
	) {
		throw new Error('Incorrect value for `discharge`');
	}

	if (!isString(params.discharge.date) || !isDate(params.discharge.date)) {
		throw new Error('Incorrect value for `discharge date`');
	}

	if (!isString(params.discharge.criteria) || !params.discharge.criteria) {
		throw new Error('Incorrect value for `criteria`');
	}

	return { date: params.discharge.date, criteria: params.discharge.criteria };
};

const parseHealthCheckRating = (params: object): HealthCheckRating => {
	if (
		!('healthCheckRating' in params) ||
		!isNumber(params.healthCheckRating) ||
		!isHealthRating(params.healthCheckRating)
	) {
		throw new Error('Incorrect value for `healthCheckRating`');
	}

	return params.healthCheckRating;
};

const parseEmployerName = (params: object): string => {
	if (!('employerName' in params) || !isString(params.employerName) || !params.employerName) {
		throw new Error('Incorrect value for `employerName`');
	}

	return params.employerName;
};

const parseSickLeave = (params: object): { startDate: string; endDate: string } | undefined => {
	if (!('sickLeave' in params)) {
		return undefined;
	}

	if (typeof params.sickLeave !== 'object' || params.sickLeave === null) {
		throw new Error('Incorrect value for `sickLeave`');
	}

	if (
		!('startDate' in params.sickLeave) ||
		!isString(params.sickLeave.startDate) ||
		!isDate(params.sickLeave.startDate)
	) {
		throw new Error('Incorrect value for `startDate`');
	}

	if (
		!('endDate' in params.sickLeave) ||
		!isString(params.sickLeave.endDate) ||
		!isDate(params.sickLeave.endDate)
	) {
		throw new Error('Incorrect value for `endDate`');
	}

	return { startDate: params.sickLeave.startDate, endDate: params.sickLeave.endDate };
};

const parseDiagnosisCodes = (params: object): Array<Diagnosis['code']> | undefined => {
	if (!('diagnosisCodes' in params)) {
		return undefined;
	}

	if (!Array.isArray(params.diagnosisCodes) || !isDiagnosisCodesArray(params.diagnosisCodes)) {
		throw new Error('Incorrect value for `diagnosisCodes`');
	}

	return params.diagnosisCodes;
};

export default parseNewEntry;
