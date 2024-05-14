import { DiaryEntry, NewDiaryEntry } from '../types';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaryEntries = async () => {
	const res = await axios.get<DiaryEntry[]>(baseUrl);
	return res.data;
};

export const createDiaryEntry = async (
	entry: NewDiaryEntry
): Promise<[string | null, DiaryEntry | null]> => {
	try {
		const res = await axios.post<DiaryEntry>(baseUrl, entry);
		return [null, res.data];
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return [error.response?.data || error.message, null];
		}

		console.error(error);
		return ['Unknown error', null];
	}
};
