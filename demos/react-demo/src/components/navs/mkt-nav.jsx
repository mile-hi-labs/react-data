import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggle, Nav } from 'components/basics/navs';
import { Button, ButtonText } from 'components/basics/buttons';
import { LibLogo } from 'utils/assets/branding';

const MktNav = (props) => {
	const { history } = props;

	// Render
	return (
		<Navbar className='mkt flex-between'>
			<NavbarBrand to='/' img={<img src={LibLogo}/>} className='mr-15' />
			<Nav className='flex-end'>
				{/*<Button onClick={() => console.log('test')}>Generate Data</Button>*/}
			</Nav>
		</Navbar>
	)
}

export default withRouter(MktNav);
