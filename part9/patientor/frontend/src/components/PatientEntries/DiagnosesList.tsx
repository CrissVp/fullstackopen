import { Divider, List, ListItemText } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';
import { Diagnosis } from '../../types';

const DiagnosesList = ({
	diagnoses,
	diagnosisCodes
}: {
	diagnoses: Diagnosis[];
	diagnosisCodes: Array<Diagnosis['code']>;
}) => {
	if (diagnosisCodes.length === 0) return null;

	return (
		<div style={{ paddingInline: 20, width: '100%' }}>
			<Divider textAlign='left'>
				<ListItemText>Diagnoses</ListItemText>
			</Divider>
			<List sx={{ paddingInline: 2, paddingBlock: 0 }}>
				{diagnosisCodes.map((diagnosisCode) => (
					<ListItemText key={diagnosisCode}>
						<p style={{ display: 'flex', gap: 4, alignItems: 'center', marginBlock: 6 }}>
							<LocalHospital sx={{ color: 'lightgreen' }} />
							{diagnosisCode} - {diagnoses.find((d) => d.code === diagnosisCode)?.name}
						</p>
					</ListItemText>
				))}
			</List>
		</div>
	);
};

export default DiagnosesList;
