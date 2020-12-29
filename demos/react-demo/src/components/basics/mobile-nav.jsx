import React, { Fragment, useState } from 'react';

const MobileNavHeader = (props) => {
	const { className = '', children } = props;

	return (
		<div className={'mobile-nav-header ' + className}>
			{children}
		</div>
	)
}

const MobileNavHero = (props) => {
	const { className = '', children } = props;

	return (
		<div className={'mobile-nav-hero ' + className}>
			{children}
		</div>
	)
}

const MobileNavBody = (props) => {
	const { className = '', children } = props;

	return (
		<div className={'mobile-nav-body ' + className}>
			{children}
		</div>
	)
}

const MobileNavFooter = (props) => {
	const { className = '', children } = props;

	return (
		<div className={'mobile-nav-footer ' + className}>
			{children}
		</div>
	)
}

export { MobileNavHeader, MobileNavHero, MobileNavBody, MobileNavFooter }