import React from 'react';
import RSwitch from 'react-switch';
import { FormLabel } from 'components/basics/forms';

const SwitchWrapper = (props) => {
  const { label, value = false, onChange, className = '', children } = props;

  return (
    <FormLabel className={'switch-wrapper ' + className}>
      {label && <span className='mr-15'>{label}</span>}
      <RSwitch type='text' checked={value} onChange={value => onChange(value)}/>
    </FormLabel>
  )
}

const Switch = (props) => {
  const { label, value = false, onChange, className = '', children } = props;

  return (
    <RSwitch type='text' checked={value} readonly/>
  )
}

export default SwitchWrapper;

// Docs:
// https://github.com/markusenglund/react-switch#readme
