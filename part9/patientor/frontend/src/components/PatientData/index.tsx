import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PatientPersonalData from './PatientPersonalData';
import PatientEntries from '../PatientEntries';
import AddEntryForm from '../AddEntryForm';

import patientService from '../../services/patients';
import { Diagnosis, Entry, Patient } from '../../types';

const PatientData = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
	const { id } = useParams();
	const [patient, setPatient] = useState<Patient | undefined>(undefined);
	const [entries, setEntries] = useState<Entry[]>([]);

	useEffect(() => {
		if (id) {
			const getPatientData = async () => {
				const patient = await patientService.getById(id);
				setPatient(patient);
				setEntries(patient.entries);
			};

			getPatientData();
		}
	}, [id]);

	if (!patient) return null;

	return (
		<div style={{ maxWidth: 800, margin: '20px auto' }}>
			<PatientPersonalData patient={patient} />
			<AddEntryForm id={patient.id} diagnoses={diagnoses} updateEntries={setEntries} />
			<PatientEntries diagnoses={diagnoses} entries={entries} />
		</div>
	);
};

export default PatientData;
