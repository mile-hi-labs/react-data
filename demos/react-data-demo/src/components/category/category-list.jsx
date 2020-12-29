import React, { Fragment } from 'react';
import { CategoryListCard } from 'components/category/category-card';
import { SectionEmpty } from 'components/basics/empties';
import { Row, Col } from 'components/basics/grids';
import { ListSkeleton, SearchSkeleton } from 'components/vendors/loading-skeleton-wrapper';

const CategoryList = (props) => {
	const { categories = [], selectedID, selectedIDs, loading, onClick } = props;

	if (loading) {
		return <ListSkeleton count={3} />
	}
	if (categories.length > 0) {
		return (
			<Row>
				{categories.map(category => (
					<Col key={category.id} xs={12}>
						<CategoryListCard category={category}/>
					</Col>
				))}
			</Row>
		)
	}
	return (
		<SectionEmpty
			icon='info'
			title='Categories'
			msg="Sorry, looks like there aren't any authors yet."
		/>
	)
}

export default CategoryList;
