interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartExtended extends CoursePartBase {
	description: string;
}

interface CoursePartBasic extends CoursePartExtended {
	kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: 'group';
}

interface CoursePartBackground extends CoursePartExtended {
	backgroundMaterial: string;
	kind: 'background';
}

interface CoursePartSpecial extends CoursePartExtended {
	requirements: string[];
	kind: 'special';
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;
