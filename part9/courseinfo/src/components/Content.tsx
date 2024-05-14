import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.kind) {
		case 'basic': {
			return (
				<>
					<h4>{part.name}</h4>
					<p>Description: {part.description}</p>
					<p>Exercise Count: {part.exerciseCount}</p>
				</>
			);
		}
		case 'group': {
			return (
				<>
					<h4>{part.name}</h4>
					<p>Group Project Count: {part.groupProjectCount}</p>
					<p>Exercise Count: {part.exerciseCount}</p>
				</>
			);
		}
		case 'background': {
			return (
				<>
					<h4>{part.name}</h4>
					<p>Description: {part.description}</p>
					<p>Background Material: {part.backgroundMaterial}</p>
					<p>Exercise Count: {part.exerciseCount}</p>
				</>
			);
		}
		case 'special': {
			return (
				<>
					<h4>{part.name}</h4>
					<p>Description: {part.description}</p>
					<p>Required Skills: {part.requirements.join(', ')}</p>
					<p>Exercise Count: {part.exerciseCount}</p>
				</>
			);
		}
	}
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
	return (
		<div>
			{parts.map((part, index) => (
				<Part key={index} part={part} />
			))}
		</div>
	);
};

export default Content;
