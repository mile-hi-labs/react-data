import React, { Fragment } from 'react';
import RbImage from 'react-bootstrap/Image'


const Image = (props) => {
	const { src, className } = props;
	
	if (src == null) { return null };
	return <RbImage src={src} rounded={true} fluid={true} className={className} />
}

const CircleImage = (props) => {
	const { src, className } = props;
	
	if (src == null) { return null };
	return <RbImage src={src} roundedCircle={true} className={className} />
}

const FluidImage = (props) => {
	const { src, className } = props;
	
	if (src == null) { return null };
	return <RbImage src={src} fluid={true} className={className} />
}

export { Image, CircleImage, FluidImage }

// Docs
// https://react-bootstrap.github.io/components/images/#image-props