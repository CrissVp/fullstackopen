import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
	query {
		allAuthors {
			id
			name
			born
			bookCount
		}
	}
`;

export const ADD_AUTHOR_BIRTH = gql`
	mutation setAuthorBirth($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			id
			name
			born
			bookCount
		}
	}
`;
