import React, { useRef, forwardRef, useEffect, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import RbTooltip from 'react-bootstrap/Tooltip';
import { Fade } from 'components/basics/animations';
import { logger } from 'utils/helpers';

const TooltipWrapper = (props) => {
  const { id, trigger = ['hover', 'focus'], placement = 'right', text, children } = props;
  const [ show, setShow ] = useState(false);
  const delay = { show: 0, hide: 0 }
  const popperConfig = {
    modifiers: {
      name: 'offset',
      options: {
        offset: [0, 20]
      }
    }
  }

  return (
    <OverlayTrigger
      trigger={trigger}
      placement={placement}
      delay={delay}
      popperConfig={popperConfig}
      onToggle={() => setShow(!show)}
      overlay={<Tooltip show={show} {...props}>{text}</Tooltip>}>
      {({ ref, ...triggerHandler }) => (
        <span {...triggerHandler}>
          <span ref={ref}>{children}</span>
        </span>
      )}
    </OverlayTrigger>
  )
}


const Tooltip = forwardRef((props, ref) => {
  const { id, show, text, trigger, placement } = props;
  const [ animation, setAnimation ] = useState('');

  return (
    <Fade show={show} onEnter={() => setAnimation('fade-in-right')} onExit={() => setAnimation('fade-out-right')}>
      <div className={'tooltip-wrapper ' + animation}>
        <RbTooltip id={`tooltip_${id}`} ref={ref} {...props}>
          {text}
        </RbTooltip>
      </div>
    </Fade>
  )
})

export { TooltipWrapper }

// Docs
// https://react-bootstrap.github.io/components/overlays/#tooltip-props
// https://popper.js.org/docs/v2/modifiers/offset/
// https://reactjs.org/docs/react-api.html#reactforwardref
