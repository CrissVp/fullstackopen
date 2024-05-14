import { List, ListItem, SxProps, Theme, Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types';
import EntryDetails from './EntryDetails';

const style: SxProps<Theme> = {
	py: 0,
	marginTop: 2,
	width: '100%',
	maxWidth: 800,
	borderRadius: 2,
	paddingBottom: 1,
	overflow: 'hidden',
	border: '1px solid',
	borderColor: 'divider',
	backgroundColor: 'background.paper'
};

const PatientEntries = ({ entries, diagnoses }: { entries: Entry[]; diagnoses: Diagnosis[] }) => {
	if (entries.length === 0) return null;

	const filterDiagnosis = (codes?: Array<Diagnosis['code']>) => {
		if (!codes) return [];
		return diagnoses?.filter((d) => codes.includes(d.code));
	};

	return (
		<List sx={style}>
			<ListItem>
				<Typography variant='h6'>Entries</Typography>
			</ListItem>
			{entries.map((entry) => (
				<EntryDetails
					key={entry.id}
					entry={entry}
					diagnoses={filterDiagnosis(entry.diagnosisCodes)}
				/>
			))}
		</List>
	);
};

export default PatientEntries;
