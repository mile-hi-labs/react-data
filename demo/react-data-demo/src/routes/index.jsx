import React, { useEffect, useState } from 'react';

const IndexRoute = (props) => {
	const { store, history } = props;


	// Hooks
	useEffect(() => {
		console.log('Store: ', store);
		console.log('History: ', history);
	}, [])


	// Methods


	// Render
	return (
		<div className='route'>
			<h1>Hello, Eric</h1>
		</div>
	);
}

export default IndexRoute;
