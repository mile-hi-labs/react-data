import React, { Fragment } from 'react';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { Form, FormGroup, FormControl, FormControlPrepend, FormSelect, FormTextArea } from 'components/basics/forms';
import { isEmpty, logger } from 'utils/helpers';

const BookFields = (props) => {
  const { book = {} } = props;


  // Render
  return (
    <Fragment>

      <FormGroup label='Title'>
        <FormControl
          type='text'
          placeholder='Star Wars'
          value={book.title}
          onChange={e => book.set('title', e.target.value)}
        />
      </FormGroup>

      <FormGroup label='Print Type'>
        <FormSelect
          placeholder='Please select one...'
          value={book.printType}
          options={book.printTypeOptions}
          onChange={e => book.set('printType', e.target.value)}
        />
      </FormGroup>

      <FormGroup label='Language'>
        <FormSelect
          placeholder='Please select one...'
          value={book.language}
          options={book.languageOptions}
          onChange={e => book.set('language', e.target.value)}
        />
      </FormGroup>

      <FormGroup label='Description'>
        <FormTextArea
          placeholder='tell us about it...'
          value={book.description}
          onChange={e => book.set('description', e.target.value)}
        />
      </FormGroup>

      <FormGroup label='Web Url'>
        <FormControlPrepend icon='info'>
          <FormControl
            placeholder='www.example.com'
            value={book.infoLink}
            onChange={e => book.set('infoLink', e.target.value)}
          />
        </FormControlPrepend>
      </FormGroup>

    </Fragment>
  )
}

export default BookFields;

