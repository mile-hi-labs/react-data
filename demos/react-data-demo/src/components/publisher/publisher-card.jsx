import React, { Fragment } from 'react';
import DetailCard from 'components/cards/detail-card';
import ListCard from 'components/cards/list-card';
import { isEmpty } from 'utils/helpers';

const PublisherDetailCard = (props) => {
	const { publisher = {}, loading } = props;

	return (
		<DetailCard
			icon={publisher.icon}
			photo={publisher.photo}
			title={publisher.name}
			timestamp={publisher.displayUpdatedAt}
			loading={loading}
		/>
	)
}

const PublisherListCard = (props) => {
	const { author = {}, loading } = props;

	return (
		<ListCard
			icon={publisher.icon}
			photo={publisher.photo}
			title={publisher.name}
			loading={loading}
			link={`/publishers/${publisher.id}`}
		/>
	)
}

export { PublisherDetailCard, PublisherListCard }
