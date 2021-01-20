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

const LinkBtn = (props) => {
	const { to, className = '', children } = props;

	return (
		<RRDLink to={to} className={'btn ' + className}>
			{children}
		</RRDLink>
	)
}


const LinkEmail = (props) => {
	const { to, className = '', children } = props;

	return (
		<RRDLink to={`mailto:${to}`} target='_blank' className={className}>
			{children}
		</RRDLink>
	)
}

const LinkExternal = (props) => {
	const { to, className = '', children } = props;

	return (
		<RRDLink to={to} target='_blank' className={className}>
			{children}
		</RRDLink>
	)
}

export { Link, LinkBtn, LinkEmail, LinkExternal }
