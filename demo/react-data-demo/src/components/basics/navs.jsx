import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import RBNavbar from 'react-bootstrap/Navbar';
import RBNav from 'react-bootstrap/Nav';
import { ButtonText } from 'components/basics/buttons';

const Navbar = (props) => {
	const { bg = 'white', expand = 'lg', className = '', children } = props;

	return (
		<RBNavbar bg={bg} expand={expand} className={className}>
			{children}
		</RBNavbar>
	)
}

const NavbarBrand = (props) => {
	const { to, img, className = '', children } = props;

	return (
		<RBNavbar.Brand as={Link} to={to} className={className}>
			{img && img}
			{children}
		</RBNavbar.Brand>
	)
}

const NavbarToggle = (props) => {
	const { className = '', onClick, children } = props;

	return (
		<RBNavbar.Toggle as={ButtonText} className={'btn hamburger hamburger--squeeze ' + className} onClick={onClick}>
			{children ? chldren : <span className='hamburger-box'><span className='hamburger-inner'></span></span>}
		</RBNavbar.Toggle>
	)
}

const Nav = (props) => {
	const { className = '', children } = props;

	return (
		<RBNav className={className}>
			{children}
		</RBNav>
	)
}

const NavItem = (props) => {
	const { className = '', children } = props;

	return (
		<RBNav.Item className={className}>
			{children}
		</RBNav.Item>
	)
}

const NavBtn = (props) => {
	const { to, className = '', onClick, children } = props;

	return (
		<RBNav.Link as={ButtonText} to={to} className={className} onClick={onClick}>
			{children}
		</RBNav.Link>
	)
}

const NavLink = (props) => {
	const { to, className = '', children } = props;

	return (
		<RBNav.Link as={Link} to={to} className={className}>
			{children}
		</RBNav.Link>
	)
}

export { Navbar, NavbarBrand, NavbarToggle, Nav, NavItem, NavBtn, NavLink }

// Docs:
// https://react-bootstrap.github.io/components/navs/
