import React, { Fragment } from 'react';

import { Badge } from 'components/basics/badges';
import { Card, CardHeader, CardImg, CardBody, CardFooter } from 'components/basics/cards';
import { Image } from 'components/basics/images';
import { Link } from 'components/basics/links';
import { FarIcon, FadIcon } from 'components/vendors/fa-wrapper';
import { GridSkeleton } from 'components/vendors/loading-skeleton-wrapper';

const GridCard = (props) => {
	const { status, icon, photo, title, line1, line2, footer, link, loading, children } = props;

	if (loading) { return <GridSkeleton count={1}/>}
	return (
		<Link to={link}>
			<Card className='grid'>
				<CardHeader className='grid'>
					{(icon && !photo) && <FadIcon icon={icon} size='2x' className='card-icon'/>}
					{photo && <CardImg src={photo} />}
				</CardHeader>
				<CardBody>
					<div>
						{status && <Badge title={status} />}
						{title && <h4>{title}</h4>}
						{line1 && <h6>{line1}</h6>}
						{line2 && <h6>{line2}</h6>}
						{children && children}
					</div>
					{link && <span className='btn btn-xs btn-text-secondary'>Learn more<FarIcon icon='chevron-right' className='ml-2'/></span>}
				</CardBody>
				{footer && <CardFooter>{footer}</CardFooter>}
			</Card>
		</Link>
	)
}

export default GridCard;