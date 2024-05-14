export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'Male',
	Female = 'Female',
	Other = 'Other'
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3
}

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Entry[];
}

interface BaseEntry {
	id: string;
	date: string;
	specialist: string;
	description: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithouId = UnionOmit<Entry, 'id'>;
