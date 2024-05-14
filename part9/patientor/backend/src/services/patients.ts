import patientsData from '../../data/patients';
import { NewPatient, Patient, NonSensitivePatient, EntryWithouId, Entry } from '../../types';

const getPatients = (): Patient[] => {
	return patientsData;
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient: Patient = {
		id: crypto.randomUUID(),
		entries: [],
		...patient
	};

	patientsData.push(newPatient);
	return newPatient;
};

const getPatientData = (id: string): Patient | undefined => {
	return patientsData.find((p) => p.id === id);
};

const addEntryToPatient = (id: string, entry: EntryWithouId): Entry | undefined => {
	const patientIndex = patientsData.findIndex((p) => p.id === id);
	if (patientIndex === -1) return;

	const newEntry: Entry = {
		id: crypto.randomUUID(),
		...entry
	};

	patientsData[patientIndex].entries.push(newEntry);
	return newEntry;
};

const getNonSensitivePatientsData = (): NonSensitivePatient[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		gender,
		occupation,
		dateOfBirth
	}));
};

export default {
	addPatient,
	getPatients,
	getPatientData,
	addEntryToPatient,
	getNonSensitivePatientsData
};
