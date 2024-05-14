import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const diary = diaryService.findById(Number(id));

	if (!diary) return res.sendStatus(404);
	return res.send(diary);
});

router.post('/', (req, res) => {
	try {
		const newDiaryEntry = toNewDiaryEntry(req.body);
		const addedEntry = diaryService.addDiary(newDiaryEntry);
		res.json(addedEntry);
	} catch (error) {
		let errorMessage = 'Something went wrong.';

		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}

		res.status(400).send(errorMessage);
	}
});

export default router;
