import { MedicalServices, Work, Favorite, HealthAndSafety, ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	ListItem,
	ListItemText,
	Typography
} from '@mui/material';
import DiagnosesList from './DiagnosesList';
import { assertNever } from '../../utils';

import {
	Entry,
	Diagnosis,
	HospitalEntry,
	HealthCheckEntry,
	HealthCheckRating,
	OccupationalHealthcareEntry
} from '../../types';

interface Props<T> {
	entry: T;
	diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: Props<HospitalEntry>) => {
	return (
		<ListItem>
			<Accordion sx={{ width: '100%', boxShadow: 'none' }}>
				<AccordionSummary
					sx={{ padding: 0, minHeight: 40, maxHeight: 40 }}
					expandIcon={<ExpandMore />}
				>
					<Divider sx={{ width: '100%' }} textAlign='left'>
						<ListItemText disableTypography sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<Typography fontWeight={600}>{entry.date}</Typography>
							<HealthAndSafety />
						</ListItemText>
					</Divider>
				</AccordionSummary>
				<AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Typography sx={{ fontStyle: 'italic', width: '100%' }}>{entry.description}</Typography>
					<Typography sx={{ width: '100%', fontSize: 16 }}>
						Discharge
						<Typography sx={{ width: '100%', fontSize: 14 }}>
							Date: {entry.discharge.date} Criteria: {entry.discharge.criteria}
						</Typography>
					</Typography>
					<Typography sx={{ width: '100%', fontSize: 12, color: 'gray' }}>
						Diagnose by {entry.specialist}
					</Typography>
					<DiagnosesList diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes || []} />
				</AccordionDetails>
			</Accordion>
		</ListItem>
	);
};

const OccupationalHealthcareEntryDetails = ({
	entry,
	diagnoses
}: Props<OccupationalHealthcareEntry>) => {
	return (
		<ListItem>
			<Accordion sx={{ width: '100%', boxShadow: 'none' }}>
				<AccordionSummary
					sx={{ padding: 0, minHeight: 40, maxHeight: 40 }}
					expandIcon={<ExpandMore />}
				>
					<Divider sx={{ width: '100%' }} textAlign='left'>
						<ListItemText disableTypography sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<Typography fontWeight={600}>{entry.date}</Typography>
							<Work />
							<Typography fontWeight={600}>{entry.employerName}</Typography>
						</ListItemText>
					</Divider>
				</AccordionSummary>
				<AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Typography sx={{ fontStyle: 'italic', width: '100%' }}>{entry.description}</Typography>
					{entry.sickLeave && (
						<Typography sx={{ width: '100%', fontSize: 16 }}>
							Sick Leave
							<Typography sx={{ width: '100%', fontSize: 14 }}>
								Start Date: {entry.sickLeave?.startDate} End Date: {entry.sickLeave?.endDate}
							</Typography>
						</Typography>
					)}
					<Typography sx={{ width: '100%', fontSize: 12, color: 'gray' }}>
						Diagnose by {entry.specialist}
					</Typography>
					<DiagnosesList diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes || []} />
				</AccordionDetails>
			</Accordion>
		</ListItem>
	);
};

const HealthCheckEntryDetails = ({ entry, diagnoses }: Props<HealthCheckEntry>) => {
	const getRatingColor = (): string => {
		switch (entry.healthCheckRating) {
			case HealthCheckRating.Healthy:
				return 'green';
			case HealthCheckRating.LowRisk:
				return 'gold';
			case HealthCheckRating.HighRisk:
				return 'darkorange';
			case HealthCheckRating.CriticalRisk:
				return 'crimson';
			default:
				return 'black';
		}
	};

	return (
		<ListItem>
			<Accordion sx={{ width: '100%', boxShadow: 'none' }}>
				<AccordionSummary
					sx={{ padding: 0, minHeight: 40, maxHeight: 40 }}
					expandIcon={<ExpandMore />}
				>
					<Divider sx={{ width: '100%' }} textAlign='left'>
						<ListItemText disableTypography sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<Typography fontWeight={600}>{entry.date}</Typography>
							<MedicalServices />
						</ListItemText>
					</Divider>
				</AccordionSummary>
				<AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Typography sx={{ fontStyle: 'italic', width: '100%', fontSize: 16 }}>
						{entry.description}
					</Typography>
					<Typography
						sx={{ width: '100%', display: 'flex', gap: 1, alignItems: 'center', fontSize: 14 }}
					>
						Health Check Rating: {entry.healthCheckRating}
						<Favorite fontSize='small' sx={{ color: getRatingColor() }} />
					</Typography>
					<Typography sx={{ width: '100%', fontSize: 12, color: 'gray' }}>
						Diagnose by {entry.specialist}
					</Typography>
					<DiagnosesList diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes || []} />
				</AccordionDetails>
			</Accordion>
		</ListItem>
	);
};

const EntryDetails = ({ entry, diagnoses }: Props<Entry>) => {
	switch (entry.type) {
		case 'HealthCheck':
			return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
		case 'OccupationalHealthcare':
			return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
		case 'Hospital':
			return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
