import React, { Fragment } from 'react';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { Form, FormGroup, FormControl, FormControlPrepend, FormSelect, FormTextArea } from 'components/basics/forms';
import { isEmpty, logger } from 'utils/helpers';

const BookFields = (props) => {
  const { book = {} } = props;


  // Render
  return (
    <Fragment>

      <FormGroup label='Name'>
        <FormControl
          type='text'
          placeholder='Robert Redford'
          value={book.title}
          onChange={e => book.set('title', e.target.value)}
        />
      </FormGroup>

      <FormGroup label='Print Type'>
        <FormSelect
          placeholder='Please select one...'
          value={book.printType}
          options={book.printTypeOptions}
          onChange={value => book.set('printType', value)}
        />
      </FormGroup>

      <FormGroup label='Language'>
        <FormSelect
          placeholder='Please select one...'
          value={book.language}
          options={book.languageOptions}
          onChange={value => book.set('language', value)}
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
            value={book.urls && book.urls.webUrl}
            onChange={e => book.set('urls.webUrl', e.target.value)}
          />
        </FormControlPrepend>
      </FormGroup>

    </Fragment>
  )
}

export default BookFields;

