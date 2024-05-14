export enum Weather {
	Sunny = 'sunny',
	Rainy = 'rainy',
	Windy = 'windy',
	Cloudy = 'cloudy',
	Stormy = 'stormy'
}

export enum Visibility {
	Great = 'great',
	Good = 'good',
	Ok = 'ok',
	Poor = 'poor'
}

export interface DiaryEntry {
	id: number;
	date: string;
	comment: string;
	weather: Weather;
	visibility: Visibility;
}

export interface NewEntryFormElements {
	visibility: { value: Visibility };
	weather: { value: Weather };
	comment: { value: string };
	date: { value: string };
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
