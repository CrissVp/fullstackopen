import { FormControl, Input, MenuItem, Select, Typography } from '@mui/material';
import { EntryWithouId, HealthCheckRating } from '../../types';

const EntryUniqueFields = ({ entry }: { entry: EntryWithouId['type'] }) => {
	switch (entry) {
		case 'OccupationalHealthcare': {
			return (
				<>
					<FormControl margin='dense' fullWidth>
						<Typography variant='caption'>Employer Name</Typography>
						<Input name='employer' placeholder='Employer name...' />
					</FormControl>
					<FormControl margin='dense' fullWidth>
						<Typography variant='caption'>Sick Leave Start Date</Typography>
						<Input type='date' name='sickLeaveStartDate' />
					</FormControl>
					<FormControl margin='dense' fullWidth>
						<Typography variant='caption'>Sick Leave End Date</Typography>
						<Input type='date' name='sickLeaveEndDate' />
					</FormControl>
				</>
			);
		}
		case 'HealthCheck': {
			return (
				<FormControl margin='dense' fullWidth required>
					<Typography variant='caption'>Health CheckRating</Typography>
					<Select defaultValue={HealthCheckRating.Healthy} name='rating' fullWidth size='small'>
						<MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
						<MenuItem value={HealthCheckRating.LowRisk}>LowRisk</MenuItem>
						<MenuItem value={HealthCheckRating.HighRisk}>HighRisk</MenuItem>
						<MenuItem value={HealthCheckRating.CriticalRisk}>CriticalRisk</MenuItem>
					</Select>
				</FormControl>
			);
		}
		case 'Hospital': {
			return (
				<>
					<FormControl margin='dense' fullWidth required>
						<Typography variant='caption'>Discharge Date</Typography>
						<Input type='date' name='dischargeDate' />
					</FormControl>
					<FormControl margin='dense' fullWidth>
						<Typography variant='caption'>Discharge Criteria</Typography>
						<Input name='dischargeCriteria' placeholder='Discharge criteria...' />
					</FormControl>
				</>
			);
		}
	}
};

export default EntryUniqueFields;
