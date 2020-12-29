import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import RBButton from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FarIcon } from 'components/vendors/fa-wrapper';

const Button = (props) => {
	const {  type = 'button', size = 'sm', variant = 'primary', taskRunning, onClick, className = '', children } = props;

	return (
		<RBButton type={type} size={size} variant={variant} className={className} onClick={onClick}>
			{taskRunning ? <Spinner role='status' animation='border' size={'sm'} /> : children }
		</RBButton>
	)
}


const ButtonBlock = (props) => {
	const { type = 'button', size = 'lg', variant, taskRunning, onClick, className = '', children } = props;

	return (
		<RBButton type={type} size={size} variant={variant} className={className} onClick={onClick} block>
			{taskRunning ? <Spinner role='status' animation='border' size={'sm'}/> : children}
		</RBButton>
	)
}


const ButtonOutline = (props) => {
	const { type ='button', size = 'sm', variant, taskRunning, onClick, className = '', children } = props;

	return (
		<RBButton type={type} size={size} variant={`outline-${variant}`} className={className} onClick={onClick}>
			{taskRunning ? <Spinner role='status' animation='border' size={'sm'} /> : children }
		</RBButton>
	)
}


const ButtonText = (props) => {
	const { type = 'button', as, size = 'sm' , variant = 'blue', taskRunning, onClick, className = '', children } = props;

	return (
		<RBButton type={type} as={as} size={size} variant={`text-${variant}`} className={className} onClick={onClick}>
			{taskRunning ? <Spinner role='status' animation='border' size={'sm'} /> : children }
		</RBButton>
	)
}

const ButtonWrapper = (props) => {
	const { type, size = 'sm', taskRunning, onClick, className = '', children } = props;

	return (
		<Button type='button' size={size} variant='wrapper' className={className} onClick={onClick}>
			{taskRunning ? <Spinner role='status' animation='border' size={'sm'}/> : children}
		</Button>
	)
}

export { Button, ButtonBlock, ButtonOutline, ButtonText, ButtonWrapper }
