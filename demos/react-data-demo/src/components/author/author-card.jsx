import React, { Fragment } from 'react';
import DetailCard from 'components/cards/detail-card';
import ListCard from 'components/cards/list-card';
import { isEmpty } from 'utils/helpers';

const AuthorDetailCard = (props) => {
	const { author = {}, loading } = props;

	return (
		<DetailCard
			icon={author.icon}
			photo={author.photo}
			title={author.name}
			timestamp={author.displayUpdatedAt}
			loading={loading}
		/>
	)
}

const AuthorListCard = (props) => {
	const { author = {}, loading } = props;

	return (
		<ListCard
			icon={author.icon}
			photo={author.photo}
			title={author.name}
			loading={loading}
			link={`/authors/${author.id}`}
		/>
	)
}

export { AuthorDetailCard, AuthorListCard }
