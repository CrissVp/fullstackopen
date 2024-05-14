import patientService from '../services/patients';
import dataParsers from '../utils';
import express from 'express';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
	return res.json(patientService.getNonSensitivePatientsData());
});

patientsRouter.post('/', (req, res) => {
	try {
		const newPatient = dataParsers.parseNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		return res.json(addedPatient);
	} catch (error) {
		let errorMessage = 'Something went wrong.';

		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}

		return res.status(400).send(errorMessage);
	}
});

patientsRouter.get('/:id', (req, res) => {
	const patient = patientService.getPatientData(req.params.id);
	if (!patient) return res.status(404).json({ message: 'Patient not found' });

	return res.json(patient);
});

patientsRouter.post('/:id/entries', (req, res) => {
	try {
		const { id } = req.params;
		const newEntry = dataParsers.parseNewEntry(req.body);
		const addedEntry = patientService.addEntryToPatient(id, newEntry);
		
		if (!addedEntry) return res.status(404).send('Patient registry not found');
		return res.json(addedEntry);
	} catch (error) {
		let errorMessage = 'Something went wrong.';

		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}

		return res.status(400).send(errorMessage);
	}
});

export default patientsRouter;
