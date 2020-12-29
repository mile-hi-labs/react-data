import React, { Fragment } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Card, CardHeader, CardBody } from 'components/basics/cards';
import { Container, Row, Col } from 'components/basics/grids';
import { listBuilder } from 'utils/list-builder';

const COLOR = '#DAE2E7';
const ACTIVE_COLOR = '#F6F8F9';

const ActivitySkeleton = (props) => {
	const { count } = props;

	return (
		<SkeletonTheme color={COLOR} highlightColor={ACTIVE_COLOR}>
			{listBuilder(count).map((skeleton, index) => (
		 		<Card key={index} className='activity'>
					<CardBody>
						<h6><Skeleton width='5%' className='mr-15'/> <Skeleton width='40%'/></h6>
			  		<h6><Skeleton width='100%'/></h6>
		  		</CardBody>
				</Card>
			))}
		</SkeletonTheme>
	)
}

const DetailSkeleton = (props) => {
	const { count } = props;
	return <GridSkeleton count={count} />;
}


const GridSkeleton = (props) => {
	const { count } = props;

	return (
		<SkeletonTheme color={COLOR} highlightColor={ACTIVE_COLOR}>
			{listBuilder(count).map((skeleton, index) => (
		 		<Card key={index} className='grid'>
		 			<CardHeader className='grid'>
						<Skeleton className='skeleton-img'/>
					</CardHeader>
					<CardBody>
						<h6><Skeleton width='75%'/></h6>
			  		<h6><Skeleton width='50%'/></h6>
			  		<h6><Skeleton width='25%'/></h6>
		  		</CardBody>
				</Card>
			))}
		</SkeletonTheme>
	)
}

const ListSkeleton = (props) => {
	const { count } = props;

	return (
		<SkeletonTheme color={COLOR} highlightColor={ACTIVE_COLOR}>
			{listBuilder(count).map((skeleton, index) => (
		 		<Card key={index} className='list'>
					<Skeleton className='skeleton-img'/>
					<CardBody>
						<h6><Skeleton width='50%'/></h6>
			  		<h6><Skeleton width='35%'/></h6>
			  		<h6><Skeleton width='25%'/></h6>
		  		</CardBody>
				</Card>
			))}
		</SkeletonTheme>
	)
}

const StatSkeleton = (props) => {
	const { count } = props;

	return (
		<SkeletonTheme color={COLOR} highlightColor={ACTIVE_COLOR}>
			<Row>
				{listBuilder(count).map((skeleton, index) => (
					<Col key={index} sm={6} md={6} lg={4}>
				 		<Card key={index} className='stat'>
							<CardBody className='stats'>
								<h4><Skeleton width='50%'/></h4>
								<h6><Skeleton width='25%'/></h6>
								<h6><Skeleton width='75%'/></h6>
							</CardBody>
						</Card>
					</Col>
				))}
			</Row>
		</SkeletonTheme>
	)
}

const TableSkeleton = (props) => {
	const { count } = props;

	return (
		<SkeletonTheme color={COLOR} highlightColor={ACTIVE_COLOR}>
			{listBuilder(count).map((skeleton, index) => (
				<Card key={index} className='table'>
					<Row className='flex'>
						<Col sm='2'>
							<h6><Skeleton/></h6>
						</Col>
						<Col sm='2'>
							<Skeleton circle={true} height={30}/>
						</Col>
						<Col sm='2'>
							<h6><Skeleton/></h6>
						</Col>
						<Col sm='2'>
							<h6><Skeleton/></h6>
						</Col>
						<Col sm='2'>
							<h6><Skeleton/></h6>
						</Col>
						<Col sm='2'>
							<h6><Skeleton/></h6>
						</Col>
			  	</Row>
		  	</Card>
			))}
		</SkeletonTheme>
	)
}

export { ActivitySkeleton, DetailSkeleton, GridSkeleton, ListSkeleton, StatSkeleton, TableSkeleton }

// Docs:
// https://github.com/dvtng/react-loading-skeleton#readme
