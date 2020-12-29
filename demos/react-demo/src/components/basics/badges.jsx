import React from 'react';
import RbBadge from 'react-bootstrap/Badge';

const Badge = (props) => {
	const { title, variant, className = '', children } = props;
	return (
		<RbBadge variant={variant} className={className} pill>
			{title && title}
			{children && children}
		</RbBadge>
	)
}

export { Badge };

// Docs:
// https://react-bootstrap.github.io/components/badge/#api
