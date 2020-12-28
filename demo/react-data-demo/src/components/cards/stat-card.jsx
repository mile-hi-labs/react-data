import React, { Fragment } from 'react';
import Accounting from 'accounting';
import { Badge } from 'components/basics/badges';
import { Card, CardHeader, CardImg, CardBody, CardFooter } from 'components/basics/cards';
import { Image } from 'components/basics/images';
import { Link } from 'components/basics/links';
import { FarIcon, FadIcon } from 'components/vendors/fa-wrapper';
import { ListSkeleton } from 'components/vendors/loading-skeleton-wrapper';

const StatCard = (props) => {
	const { stat = 0, title, description, loading, children } = props;

	if (loading) { return <ListSkeleton count={1}/>}
	return (
		<Card className='stat'>
			<CardHeader className='stat'>
				<h2 className='stat'>{Accounting.formatNumber(stat)}</h2>
			</CardHeader>
			<CardBody className='stat'>
				{title && <h6 className='title'>{title}</h6>}
				{description && <h6>{description}</h6>}
				{children && children}
			</CardBody>
		</Card>
	)
}

export default StatCard;

// Docs
// https://github.com/glennreyes/react-countup
