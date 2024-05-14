interface BaseEntry {
	id: string;
	date: string;
	specialist: string;
	description: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export interface Patient {
	id: string;
	ssn: string;
	name: string;
	gender: Gender;
	entries: Entry[];
	occupation: string;
	dateOfBirth: string;
}

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3
}

export enum Gender {
	Female = 'Female',
	Other = 'Other',
	Male = 'Male'
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithouId = UnionOmit<Entry, 'id'>;
