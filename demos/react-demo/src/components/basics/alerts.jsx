import React from 'react';
import RbAlert from 'react-bootstrap/Alert';

const Alert = (props) => {
	const { variant, className = '', children } = props;
	return (
		<RbAlert variant={variant} className={className}>
			{children}
		</RbAlert>
	)
}

export { Alert };

// Docs:
// https://react-bootstrap.github.io/components/alert/#api
