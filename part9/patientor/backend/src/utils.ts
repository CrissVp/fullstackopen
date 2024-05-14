import parseNewEntry from './validations/entry';
import parseNewPatient from './validations/patient';

export const isNumber = (param: unknown): param is number => {
	return !isNaN(Number(param));
};

export const isString = (param: unknown): param is string => {
	return typeof param === 'string' || param instanceof String;
};

export const isDate = (param: string): boolean => {
	return Boolean(Date.parse(param));
};

const dataParsers = { parseNewPatient, parseNewEntry };
export default dataParsers;
