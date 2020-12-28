import React, { Fragment } from 'react';
import DetailCard from 'components/cards/detail-card';
import ListCard from 'components/cards/list-card';
import { isEmpty } from 'utils/helpers';

const CategoryDetailCard = (props) => {
	const { category = {}, loading } = props;

	return (
		<DetailCard
			icon='category'
			photo={category.photo}
			title={category.name}
			timestamp={category.displayUpdatedAt}
			loading={loading}
		/>
	)
}

const CategoryListCard = (props) => {
	const { category = {}, loading } = props;

	return (
		<ListCard
			icon='category'
			photo={category.photo}
			title={category.name}
			loading={loading}
			link={`/categories/${category.id}`}
		/>
	)
}

export { CategoryDetailCard, CategoryListCard }
