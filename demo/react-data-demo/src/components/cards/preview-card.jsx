import React, { Fragment } from 'react';

import { Badge } from 'components/basics/badges';
import { Card, CardHeader, CardImg, CardBody, CardFooter } from 'components/basics/cards';
import { Image } from 'components/basics/images';
import { ButtonWrapper, ButtonText } from 'components/basics/buttons';
import { FarIcon, FadIcon } from 'components/vendors/fa-wrapper';
import { ListSkeleton } from 'components/vendors/loading-skeleton-wrapper';

const PreviewCard = (props) => {
	const { status, icon, photo, title, subtitle, line1, line2, footer, onClick, loading, children } = props;

	if (loading) { return <ListSkeleton count={1}/>}
	return (
		<ButtonWrapper onClick={onClick}>
			<Card className='list'>
				<CardHeader className='list'>
					{(icon && !photo) && <FadIcon icon={icon} size='2x' className='card-icon'/>}
					{photo && <CardImg src={photo} />}
				</CardHeader>
				<CardBody className='list'>
					<div>
						<div className='flex-start'>
							{title && <h6 className='title'>{title}</h6>}
							{status && <Badge title={status} className='ml-3'/>}
						</div>
						{subtitle && <h6 className='subtitle'>{subtitle}</h6>}
						{line1 && <h6>{line1}</h6>}
						{line2 && <h6>{line2}</h6>}
						{children && children}
					</div>
					{onClick && (
						<ButtonText as='div' size='xs' variant='gray'>
							<FarIcon icon='ellipsis-h' size='2x'/>
						</ButtonText>
					)}
				</CardBody>
				{footer && <CardFooter>{footer}</CardFooter>}
			</Card>
		</ButtonWrapper>
	)
}

export default PreviewCard;
