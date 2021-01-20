import React, { Fragment } from 'react';
import { Avatar } from 'components/basics/avatars';
import { Badge } from 'components/basics/badges';
import { Card, CardHeader, CardImg, CardBody, CardFooter } from 'components/basics/cards';
import { Image } from 'components/basics/images';
import { Link } from 'components/basics/links';
import { FarIcon, FadIcon } from 'components/vendors/fa-wrapper';
import { ActivitySkeleton } from 'components/vendors/loading-skeleton-wrapper';

const NotificationCard = (props) => {
	const { avatar = {}, title, description, timestamp, loading, onClick, className = '' } = props;

	if (loading) { return <ActivitySkeleton count={3}/>}
	return (
		<Card className={'activity ' + className}>
			<CardBody className='activity'>
				{avatar && <Avatar size='xs' photo={avatar.photo} title={avatar.name} onClick={onClick} className='pb-3'/>}
				{title && <h6 className='title'>{title}</h6>}
				{description && <h6>{description}</h6>}
			</CardBody>
			{timestamp && <CardFooter className='activity'>{timestamp}</CardFooter>}
		</Card>
	)
}

export default NotificationCard;
