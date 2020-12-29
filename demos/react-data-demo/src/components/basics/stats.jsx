import React from 'react';
import { Card } from 'components/basics/cards';

const Stat = (props) => {
	const { stat, title, msg, children } = props;
	return (
		<Card className='stat'>
			{stat && <h3 className='stat'>{stat}</h3>}
			{title && <h6 className='title'>{title}</h6>}
			{msg && <h6>{msg}</h6>}
			{children && children}
		</Card>
	)
}

stat.defaultProps = { stat: 0, title: '--', msg: '--' }

export { Stat };

// Docs:
