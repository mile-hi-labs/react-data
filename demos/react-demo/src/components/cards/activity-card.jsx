import React, { Fragment } from 'react';

import { Badge } from 'components/basics/badges';
import { Card, CardHeader, CardImg, CardBody, CardFooter } from 'components/basics/cards';
import { Image } from 'components/basics/images';
import { Link } from 'components/basics/links';
import { FarIcon, FadIcon } from 'components/vendors/fa-wrapper';
import { ActivitySkeleton } from 'components/vendors/loading-skeleton-wrapper';

const ActivityCard = (props) => {
	const { icon, avatar, title, description, timestamp, link, loading } = props;

	if (loading) { return <ActivitySkeleton count={3}/>}
	return (
		<Card className='activity'>
			<CardBody className='activity'>
				<div className='pb-1 flex-start'>
					{icon && <FadIcon icon={icon} className='gray-color mr-15'/>}
					{title && <h6 className='title'>{title}</h6>}
				</div>
				{description && <small>{description}</small>}
			</CardBody>
			{timestamp && <CardFooter className='activity'>{timestamp}</CardFooter>}
		</Card>
	)
}

export default ActivityCard;
