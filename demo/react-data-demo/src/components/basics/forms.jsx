import React, { useEffect } from 'react';
import RbForm from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ButtonText } from 'components/basics/buttons';
import { TagsContainer } from 'components/basics/tags';
import Spinner from 'react-bootstrap/Spinner';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { capitalize, stringToUnderscore, underscoreToString } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';

const Form = (props) => {
  const { className = '', onSubmit, children } = props;

  return (
    <form onSubmit={onSubmit} className={className}>
      {children && children}
    </form>
  )
}

const FormGroup = (props) => {
	const { id, label, className = '', children } = props;

	return (
		<RbForm.Group controlId={id ? id : stringToUnderscore(label)} className={className}>
      {label && <FormLabel label={label}/>}
			{children && children}
		</RbForm.Group>
	)
}

FormGroup.defaultProps = { id: '', label: '' }

const FormLabel = (props) => {
	const { label, className = '', children } = props;

	return (
		<RbForm.Label className={className}>
			{label && label}
			{children && children}
		</RbForm.Label>
	)
}

const FormControlPrepend = (props) => {
  const { icon, loading, className = '', children } = props;

  return (
    <InputGroup className={className}>
      <InputGroup.Prepend>
        <InputGroup.Text>{loading ? <Spinner role='status' animation='border' size={'sm'} />  : <FarIcon icon={icon}/>}</InputGroup.Text>
      </InputGroup.Prepend>
      {children}
    </InputGroup>
  )
}

const FormControlPreAndAppend = (props) => {
  const { prependIcon, appendIcon, loading, onClick, action, className = '', children } = props;

  return (
    <InputGroup className={className}>
      <InputGroup.Prepend>
        <InputGroup.Text>{loading ? <Spinner role='status' animation='border' size={'sm'} />  : <FarIcon icon={prependIcon}/>}</InputGroup.Text>
      </InputGroup.Prepend>
      {children}
      <InputGroup.Append>
        <InputGroup.Text className='btn btn-secondary' onClick={onClick}>
          <FarIcon icon={appendIcon}/>
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  )
}

const FormControlAppend = (props) => {
  const { icon, className = '', children } = props;

  return (
    <InputGroup className={className}>
      {children}
      <InputGroup.Append>
        <InputGroup.Text><FarIcon icon={icon}/></InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  )
}

const FormControl = (props) => {
  const { id, type = 'text', name, autoFocus = false, placeholder, value = '', className = '', onClick, onChange, onKeyDown, onFocus, onBlur, readOnly = false } = props;

  return (
    <RbForm.Control
      id={id}
      type={type}
      name={name}
      autoFocus={autoFocus}
      placeholder={placeholder}
      defaultValue={value} // controlled vs uncontrolled: https://fb.me/react-controlled-components
      onChange={onChange}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      readOnly={readOnly}
    />
  )
}

const FormControlDiv = (props) => {
  const { id, value ='', placeholder, className = '', onClick, onFocus } = props;

  return (
    <div id={id} className={'form-control div ' + className} onClick={onClick} onFocus={onFocus}>
      {value ? <TagsContainer>{value}</TagsContainer> : <span className='gray-color'>{placeholder}</span>}
    </div>
  )
}

const FormSelect = (props) => {
  const { value = -1, options = [], placeholder, className = '', onChange } = props;

  return (
    <RbForm.Control as='select' value={value} onChange={onChange} custom>
      <option disabled value={-1}>{placeholder}</option>
      {options.map(option => (
        <option key={option} value={option}>{typeof option == 'string' ? capitalize(underscoreToString(option)) : option}</option>
      ))}
    </RbForm.Control>
  )
}

const FormTextArea = (props) => {
  const { name, value, placeholder, rows = 5, className = '', onChange, onFocus } = props;

  return (
    <RbForm.Control
      as='textarea'
      name={name}
      placeholder={placeholder}
      rows={rows}
      defaultValue={value} // Uncontrolled vs controlled
      onChange={onChange}
      onFocus={onFocus}
    />
  )
}

const FormText = (props) => {
  const { text, className = '', children } = props;

  return (
    <RbForm.Text className={className}>
    	{text && text}
    	{children}
    </RbForm.Text>
  )
}

export {
	Form,
  FormGroup,
  FormLabel,
  FormControlPrepend,
  FormControlPreAndAppend,
  FormControlAppend,
  FormControl,
  FormControlDiv,
  FormSelect,
  FormTextArea,
  FormText,
}

// Docs
// https://react-bootstrap.github.io/components/forms/
