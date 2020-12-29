import React, { Fragment } from 'react';
import { PublisherListCard } from 'components/publisher/publisher-card';
import { SectionEmpty } from 'components/basics/empties';
import { Row, Col } from 'components/basics/grids';
import { ListSkeleton, SearchSkeleton } from 'components/vendors/loading-skeleton-wrapper';

const PublisherList = (props) => {
	const { publishers = [], loading, onClick } = props;

	if (loading) {
		return <ListSkeleton count={3} />
	}
	if (publishers.length > 0) {
		return (
			<Row>
				{publishers.map(publisher => (
					<Col key={publisher.id} xs={12}>
						<PublisherListCard publisher={publisher}/>
					</Col>
				))}
			</Row>
		)
	}
	return (
		<SectionEmpty
			icon='info'
			title='Publishers'
			msg="Sorry, looks like there aren't any publishers yet."
		/>
	)
}

export default PublisherList;
