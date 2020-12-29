import React, { Fragment } from 'react';
import { AuthorListCard } from 'components/author/author-card';
import { SectionEmpty } from 'components/basics/empties';
import { Row, Col } from 'components/basics/grids';
import { ListSkeleton, SearchSkeleton } from 'components/vendors/loading-skeleton-wrapper';

const AuthorList = (props) => {
	const { authors = [], loading, onClick } = props;

	if (loading) {
		return <ListSkeleton count={3} />
	}
	if (authors.length > 0) {
		return (
			<Row>
				{authors.map(author => (
					<Col key={author.id} xs={12}>
						<AuthorListCard author={author}/>
					</Col>
				))}
			</Row>
		)
	}
	return (
		<SectionEmpty
			icon='info'
			title='Authors'
			msg="Sorry, looks like there aren't any authors yet."
		/>
	)
}

export default AuthorList;
