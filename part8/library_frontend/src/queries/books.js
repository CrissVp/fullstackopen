import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		id
		title
		genres
		published
		author {
			id
			name
		}
	}
`;

export const GET_ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const GET_BOOKS_BY_GENRE = gql`
	query booksByGenre($genre: String) {
		allBooks(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const ADD_BOOK = gql`
	mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;
