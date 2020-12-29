import React, { Fragment } from 'react';
import DetailCard from 'components/cards/detail-card';
import ListCard from 'components/cards/list-card';
import { isEmpty } from 'utils/helpers';

const BookDetailCard = (props) => {
	const { book = {}, loading } = props;

	return (
		<DetailCard
			icon={book.icon}
			photo={book.photo}
			title={book.title}
			subtitle={book.authors && book.authors.map(author => author.name)}
			line1={book.previewDescription}
			timestamp={book.displayUpdatedAt}
			loading={loading}
		/>
	)
}

const BookListCard = (props) => {
	const { book = {}, loading } = props;

	return (
		<ListCard
			icon={book.icon}
			photo={book.photo}
			title={book.title}
			subtitle={book.authors && book.authors.map(author => author.name)}
			line1={book.previewDescription}
			loading={loading}
			link={`/books/${book.id}`}
		/>
	)
}

export { BookDetailCard, BookListCard }
