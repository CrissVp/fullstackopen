import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../types';
import diaries from '../../data/diaries';

const getEntries = (): DiaryEntry[] => {
	return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
	const entry = diaries.find((d) => d.id === id);
	return entry;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
	return diaries.map(({ id, date, weather, visibility }) => ({
		id,
		date,
		weather,
		visibility
	}));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
	const newDiaryEntry: DiaryEntry = {
		id: Math.max(...diaries.map((d) => d.id)) + 1,
		...entry
	};

	diaries.push(newDiaryEntry);
	return newDiaryEntry;
};

export default {
	addDiary,
	getEntries,
	findById,
	getNonSensitiveEntries
};
