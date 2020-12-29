import React from 'react';
import { Card } from 'components/basics/cards';

const Chart = (props) => {
	const { data, title, msg, children } = props;
	return (
		<Card className='stat'>
			{children && children}
		</Card>
	)
}

Chart.defaultProps = { stat: 0, title: '--', msg: '--' }

export { Chart };

// Docs:
