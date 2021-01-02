import React, { useEffect, useState } from 'react';
import { MktRoute } from 'components/basics/routes';
import { LinkBtn } from 'components/basics/links';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { FarIcon } from 'components/vendors/fa-wrapper';

const IndexRoute = (props) => {
	const { store = {}, toast, history } = props;


	// Render
	return (
		<MktRoute title='Library - Welcome'>
			<Container className='sm pt-3 pb-3'>

				<SectionBlock>
					<SectionHeader title='React Data Demo' />
					<SectionBody className='xs'>
						<p>This is a demo application for React data. The app connects to a remote API service and showcases how you might use the store in a typical fashion.</p>
						<p>While you play with the app, take a peek at the adapters, serializers, and models to see how they interconnect.</p>
					</SectionBody>
					<SectionFooter>
						<LinkBtn to='/books' className='btn-primary btn-block btn-lg'>
							Get Started <FarIcon icon='chevron-right' className='ml-2'/>
						</LinkBtn>
					</SectionFooter>
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

export default IndexRoute;
