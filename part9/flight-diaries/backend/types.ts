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

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
