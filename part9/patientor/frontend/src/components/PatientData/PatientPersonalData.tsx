import { Gender, Patient } from '../../types';
import { Female, Male } from '@mui/icons-material';

import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';

const PatientPersonalData = ({ patient }: { patient: Patient }) => {
	return (
		<Paper sx={{ overflow: 'hidden' }}>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: '#292929', fontWeight: 600 }}>
							<TableCell sx={{ fontWeight: 600, color: 'white' }}>Name</TableCell>
							<TableCell sx={{ fontWeight: 600, color: 'white' }}>SSN</TableCell>
							<TableCell sx={{ fontWeight: 600, color: 'white' }}>Gender</TableCell>
							<TableCell sx={{ fontWeight: 600, color: 'white' }}>Occupation</TableCell>
							<TableCell sx={{ fontWeight: 600, color: 'white' }}>Date of Birth</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>{patient.name}</TableCell>
							<TableCell>{patient.ssn}</TableCell>
							<TableCell sx={{ alignItems: 'center' }}>
								<Typography
									variant='subtitle2'
									component={'span'}
									sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
								>
									{patient.gender}
									{patient.gender === Gender.Male && <Male fontSize='small' />}
									{patient.gender === Gender.Female && <Female fontSize='small' />}
								</Typography>
							</TableCell>
							<TableCell>{patient.occupation}</TableCell>
							<TableCell>{patient.dateOfBirth}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default PatientPersonalData;
