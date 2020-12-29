import React, { Fragment } from 'react';
import { Card, CardHeader, CardImg, CardBody, CardFooter } from 'components/basics/cards';
import { ButtonWrapper, ButtonText } from 'components/basics/buttons';
import { FarIcon, FadIcon } from 'components/vendors/fa-wrapper';
import { ListSkeleton } from 'components/vendors/loading-skeleton-wrapper';

const SelectCard = (props) => {
	const { icon, title, description, selected, onSelect, loading, children } = props;

	if (loading) { return <ListSkeleton count={1}/>}
	return (
		<ButtonWrapper onClick={onSelect}>
			<Card className='select'>
				<CardBody className='select'>
					<div>
						{title && <h6 className='title'>{title}</h6>}
						{description && <h6>{description}</h6>}
						{children}
					</div>
					<ButtonText as='div' size='xs' variant={selected ? 'secondary' : 'gray'}>
						<FarIcon icon={selected ? 'check' : 'circle'} size='2x'/>
					</ButtonText>
				</CardBody>
			</Card>
		</ButtonWrapper>
	)
}

export default SelectCard;