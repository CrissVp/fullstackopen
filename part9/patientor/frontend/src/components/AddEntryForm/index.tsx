import { SyntheticEvent, useState } from 'react';
import { Diagnosis, Entry, EntryWithouId } from '../../types';
import EntryUniqueFields from './EntryUniqueFields';
import patientService from '../../services/patients';

import {
	Alert,
	Box,
	Button,
	Checkbox,
	Chip,
	FormControl,
	Input,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography
} from '@mui/material';
import { AxiosError } from 'axios';

interface ComponentProps {
	id: string;
	diagnoses: Diagnosis[];
	updateEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

interface FormFields {
	date: { value: string };
	description: { value: string };
	specialist: { value: string };
	dischargeDate: { value: string };
	dischargeCriteria: { value: string };
	rating: { value: string };
	employer: { value: string };
	sickLeaveStartDate: { value: string };
	sickLeaveEndDate: { value: string };
}

const AddEntryForm = ({ id, diagnoses, updateEntries }: ComponentProps) => {
	const [hidden, setHidden] = useState(true);
	const [notification, setNotification] = useState('');
	const [entryType, setEntryType] = useState<EntryWithouId['type']>('HealthCheck');
	const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

	const showErrorNotification = (message: string) => {
		setNotification(message);
		setTimeout(() => {
			setNotification('');
		}, 3000);
	};

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();

		const form = event.target as typeof event.target & FormFields;
		let newEntry: EntryWithouId;

		switch (entryType) {
			case 'HealthCheck':
				{
					newEntry = {
						type: entryType,
						date: form.date.value,
						description: form.description.value,
						specialist: form.specialist.value,
						healthCheckRating: +form.rating.value
					};

					if (diagnosisCodes.length !== 0) {
						newEntry.diagnosisCodes = diagnosisCodes;
					}
				}
				break;
			case 'OccupationalHealthcare':
				{
					newEntry = {
						type: entryType,
						date: form.date.value,
						description: form.description.value,
						specialist: form.specialist.value,
						employerName: form.employer.value
					};

					if (form.sickLeaveEndDate.value || form.sickLeaveStartDate.value) {
						newEntry.sickLeave = {
							startDate: form.sickLeaveStartDate.value,
							endDate: form.sickLeaveEndDate.value
						};
					}

					if (diagnosisCodes.length !== 0) {
						newEntry.diagnosisCodes = diagnosisCodes;
					}
				}
				break;
			case 'Hospital':
				{
					newEntry = {
						type: entryType,
						date: form.date.value,
						description: form.description.value,
						specialist: form.specialist.value,
						discharge: {
							date: form.dischargeDate.value,
							criteria: form.dischargeCriteria.value
						}
					};

					if (diagnosisCodes.length !== 0) {
						newEntry.diagnosisCodes = diagnosisCodes;
					}
				}
				break;
		}

		try {
			const addedEntry = await patientService.addEntry(id, newEntry);
			updateEntries((data) => data.concat(addedEntry));
			setDiagnosisCodes([]);
			setHidden(true);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				showErrorNotification(error.response?.data);
			}
		}
	};

	const handleSelectChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
		const { value } = event.target;

		if (typeof value !== 'string') {
			setDiagnosisCodes(value);
		}
	};

	if (hidden) {
		return (
			<Button onClick={() => setHidden(false)} sx={{ marginTop: 2 }} variant='contained'>
				New Entry
			</Button>
		);
	}

	return (
		<Box
			component={'form'}
			onSubmit={handleSubmit}
			sx={{ p: 2, marginTop: 2, border: '1px dashed grey' }}
		>
			{notification && (
				<Alert sx={{ marginBottom: 2 }} severity='error'>
					{notification}
				</Alert>
			)}
			<Typography variant='subtitle1' fontWeight={600}>
				New {entryType} Entry
			</Typography>
			<Select
				fullWidth
				size='small'
				value={entryType}
				sx={{ marginBlock: 2 }}
				onChange={(e) => setEntryType(e.target.value as EntryWithouId['type'])}
			>
				<MenuItem value={'OccupationalHealthcare'}>OccupationalHealthcare</MenuItem>
				<MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
				<MenuItem value={'Hospital'}>Hospital</MenuItem>
			</Select>
			<FormControl margin='dense' fullWidth required>
				<Typography variant='caption'>Date</Typography>
				<Input type='date' name='date' />
			</FormControl>
			<FormControl margin='dense' fullWidth>
				<Typography variant='caption'>Description</Typography>
				<Input name='description' placeholder='Entry description...' />
			</FormControl>
			<FormControl margin='dense' fullWidth>
				<Typography variant='caption'>Specialist</Typography>
				<Input name='specialist' placeholder='Specialist name...' />
			</FormControl>
			<FormControl margin='dense' fullWidth>
				<Typography variant='caption'>Diagnosis Codes</Typography>
				<Select
					multiple
					size='small'
					value={diagnosisCodes}
					onChange={handleSelectChange}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
				>
					{diagnoses.map((diagnosis) => (
						<MenuItem key={diagnosis.code} value={diagnosis.code}>
							<Checkbox size='small' checked={diagnosisCodes.includes(diagnosis.code)} />
							{diagnosis.code} - {diagnosis.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<EntryUniqueFields entry={entryType} />
			<FormControl
				sx={{
					marginTop: 2,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}
			>
				<Button type='button' onClick={() => setHidden(true)} color='secondary' variant='contained'>
					Close
				</Button>
				<Button type='submit' variant='contained'>
					Add
				</Button>
			</FormControl>
		</Box>
	);
};

export default AddEntryForm;
