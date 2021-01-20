import React from 'react';
import { ButtonText } from 'components/basics/buttons';
import { FarIcon } from 'components/vendors/fa-wrapper';

const RouteEmpty = (props) => {
  const { icon, title, msg, className = '', children } = props;

  return (
    <div className={'empty-block route ' + className}>
      {icon && <FarIcon icon={icon} size='2x'/>}
      {title && <h4>{title}</h4>}
      {msg && <h6>{msg}</h6>}
      {children}
    </div>
  )
}

const ListEmpty = (props) => {
  const { icon, title, msg, className = '', children } = props;

  return (
    <div className={'empty-block list ' + className}>
      {icon && <FarIcon icon={icon} size='2x'/>}
      {title && <h4>{title}</h4>}
      {msg && <h6>{msg}</h6>}
      {children}
    </div>
  )
}

const SectionEmpty = (props) => {
  const { icon, title, msg, className = '', children } = props;

  return (
    <div className={'empty-block section ' + className}>
      {icon && <FarIcon icon={icon} size='2x'/>}
      {title && <h4>{title}</h4>}
      {msg && <h6>{msg}</h6>}
      {children}
    </div>
  )
}

const PreviewEmpty = (props) => {
  const { icon, title, msg, className = '', children } = props;

  return (
    <div className={'empty-block preview ' + className}>
      {icon && <FarIcon icon={icon} size='2x'/>}
      {title && <h4>{title}</h4>}
      {msg && <h6>{msg}</h6>}
      {children}
    </div>
  )
}

export { RouteEmpty, ListEmpty, SectionEmpty, PreviewEmpty }
