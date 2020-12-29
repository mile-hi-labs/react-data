import React, { Fragment } from 'react';

import { Badge } from 'components/basics/badges';
import { Card, CardHeader, CardImg, CardBody, CardFooter } from 'components/basics/cards';
import { Image } from 'components/basics/images';
import { Link } from 'components/basics/links';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { DetailSkeleton } from 'components/vendors/loading-skeleton-wrapper';
import { truncate } from 'utils/transforms';

const DetailCard = (props) => {
	const { status, icon, photo, title, subtitle, line1, line2, timestamp, footer, loading, children } = props;

	if (loading) { return <DetailSkeleton count={1}/>}
	return (
		<Card className='detail'>
			<CardHeader className='detail'>
				{photo ? <CardImg src={photo} /> : <FarIcon icon={icon} size='2x' className='card-icon'/>}
			</CardHeader>
			<CardBody className='detail'>
				{status && <Badge title={status} className='mb-3'/>}
				{title && <h4 className='title'>{title}</h4>}
				{subtitle && <h6 className='subtitle'>{subtitle}</h6>}
				{line1 && <h6>{line1}</h6>}
				{line2 && <h6>{line2}</h6>}
				{children && children}
			</CardBody>
			{timestamp && (
				<CardFooter className='detail'>
					 Updated {timestamp}
				</CardFooter>
			)}
		</Card>
	)
}

export default DetailCard;
