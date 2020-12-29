import React, { forwardRef, useState } from 'react';
import { ButtonWrapper } from 'components/basics/buttons';

const SearchWrapper = (props) => {
	const { onClick, className = '', children } = props;

	return (
		<div className={'search-wrapper ' + className}>
			{onClick && <ButtonWrapper onClick={onClick} className={'search-bg ' + className} />}
			{children}
		</div>
	);
}

const SearchBlock = (props) => {
	const { className = '', children } = props;

	return (
		<div className={'search-block ' + className}>
			{children}
		</div>
	);
}

const SearchHeader = (props) => {
	const { title, className = '', children } = props;

	return (
		<div className={'search-header ' + className}>
			{title && <small className='title'>{title}</small>}
			{children && children}
		</div>
	);
}

const SearchBody = (props) => {
	const { className = '', children } = props;

	return (
		<div className={'search-results ' + className}>
			{children}
		</div>
	);
}

export {
	SearchWrapper,
	SearchBlock,
	SearchHeader,
	SearchBody,
}
