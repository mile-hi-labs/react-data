import React, { forwardRef, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import RbDropdown from 'react-bootstrap/Dropdown';
import { ButtonWrapper } from 'components/basics/buttons';

const Dropdown = (props) => {
	const { open, alignRight = true, toggle, className = '', children } = props;

	return (
		<RbDropdown show={open} drop='down' alignRight={alignRight} navbar={false} className={className} onToggle={toggle}>
			{children}
		</RbDropdown>
	);
}

const DropdownToggle = (props) => {
	const { variant, size, onClick, taskRunning, className = '', children } = props;

	return (
		<RbDropdown.Toggle variant={variant} size={size} onClick={onClick} className={className}>
			{taskRunning ? <Spinner role='status' animation='border' size={'sm'} /> : children }
		</RbDropdown.Toggle>
	);
}

const DropdownMenu = (props) => {
	const { open, toggle, className = '', popperConfig = {}, children } = props;

	return (
		<RbDropdown.Menu show={open} alignRight={true} popperConfig={popperConfig} onToggle={toggle}>
			<div className={className + ' dropdown-menu-inner'}>
				{children}
			</div>
		</RbDropdown.Menu>
	);
}

const DropdownItem = (props) => {
	const { as, title, onClick, className = '', children } = props;

	return (
		<RbDropdown.Item as={ButtonWrapper} onClick={onClick} className={className}>
			{title && title}
			{children && children}
		</RbDropdown.Item>
	);
}

const DropdownLink = (props) => {
	const { title, to, toggle, className = '', children } = props;

	return (
		<RbDropdown.Item as={Link} to={to} className={className}>
			{title && title}
			{children && children}
		</RbDropdown.Item>
	);
}

export { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownLink }

// Docs
// https://react-bootstrap.github.io/components/dropdowns/
