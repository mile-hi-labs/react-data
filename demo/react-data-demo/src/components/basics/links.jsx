import React, { Fragment } from 'react';
import { Link as RRDLink } from 'react-router-dom';
import { FarIcon } from 'components/vendors/fa-wrapper';

const Link = (props) => {
	const { to, className = '', children } = props;

	return (
		<RRDLink to={to} className={className}>
			{children}
		</RRDLink>
	)
}

const BtnLink = (props) => {
	const { to, title, icon, className = '', children } = props;

	return (
		<RRDLink to={to} className={'btn ' + className}>
			{title && <span>{title}</span>}
			{icon && <FarIcon icon={icon} className='ml-3'/>}
			{children}
		</RRDLink>
	)
}


const EmailLink = (props) => {
	const { to, className = '', children } = props;

	return (
		<RRDLink to={`mailto:${to}`} target='_blank' className={className}>
			{children}
		</RRDLink>
	)
}

const ExternalLink = (props) => {
	const { to, className = '', children } = props;

	return (
		<RRDLink to={to} target='_blank' className={className}>
			{children}
		</RRDLink>
	)
}

export {
	Link,
	BtnLink,
	EmailLink,
	ExternalLink,
}
