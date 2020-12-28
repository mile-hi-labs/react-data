import React, { useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { logger } from 'utils/helpers';

const Fade = (props) => {
	const { show, timeout, onEnter, onExit, children } = props;

	return (
		<Transition
			in={show}
			appear={show}
			timeout={300}
			onEntering={() => onEnter('entering')}
			onExiting={() => onExit('exiting')} unmountOnExit>
    	{children}
    </Transition>
	)
}

export { Fade }


// Docs
// https://reactcommunity.org/react-transition-group/transition
