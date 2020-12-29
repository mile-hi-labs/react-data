import React, { useEffect, useState } from 'react';
import { MktRoute } from 'components/basics/routes';
import { BtnLink } from 'components/basics/links';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';

const IndexRoute = (props) => {
	const { store = {}, toast, history } = props;


	// Render
	return (
		<MktRoute title='Library - Welcome'>
			<Container className='pt-3 pb-3'>

				<SectionBlock>
					<SectionHeader title='Welcome' />
					<SectionBody className='xs'>
						<div className='flex-between'>
							<BtnLink to='/books' title='Get Started' className='btn-primary btn-block btn-lg w-50 mr-15'/>
							<BtnLink to='/books' title='Github' className='btn-gray btn-block btn-lg w-50'/>
						</div>
					</SectionBody>
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

export default IndexRoute;
