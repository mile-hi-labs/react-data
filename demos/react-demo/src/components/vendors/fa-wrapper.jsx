import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FarIcon = (props) => {
	const { icon, size = '1x', transform, className = '' } = props;

  return icon ? <FontAwesomeIcon icon={['fas', icon]} size={size} transform={transform} className={className} /> : null;
}

export { FarIcon }
