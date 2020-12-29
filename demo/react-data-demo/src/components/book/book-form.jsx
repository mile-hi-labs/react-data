import React, { useEffect, useState } from 'react';
import { withStore } from '@mile-hi-labs/react-data';
import { withToast } from 'contexts/toast-context';

import BookFields from 'components/book/book-fields';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { Form, FormGroup, FormControl, FormText } from 'components/basics/forms';
import { Button, ButtonText } from 'components/basics/buttons';
import { Container, Row, Col } from 'components/basics/grids';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { isEmpty, logger } from 'utils/helpers';

const BookForm = (props) => {
  const { book = {}, title, store, toast, toggleModal, nextAction } = props;
  const [ taskRunning, setTaskRunning ] = useState(false);
  const [ deleteRunning, setDeleteRunning ] = useState(false);


  // Methods
  const saveBook = async () => {
    try {
      setTaskRunning(true);
      await book.save();
      toast.showSuccess('Book saved!');
      nextAction();
    } catch(e) {
      toast.showError(e);
    } finally {
      setTaskRunning(false);
    }
  }

  const destroyBook = async () => {
    try {
      setDeleteRunning(true);
      await book.destroy();
      toast.showSuccess('Book destroyed!');
      nextAction();
    } catch(e) {
      toast.showError(e);
    } finally {
      setDeleteRunning(false);
    }
  }


  // Render
  return (
    <Form onSubmit={e => e.preventDefault()}>
      <SectionHeader title={title}/>
      <SectionBody size='md'>
        <BookFields book={book} />
      </SectionBody>
      <SectionFooter className='flex-between'>
        <Button
          type='submit'
          variant='secondary'
          taskRunning={taskRunning}
          onClick={() => saveBook()}>
          Save<FarIcon icon='check' className='ml-2'/>
        </Button>
      </SectionFooter>
    </Form>
  )
}

export default withStore(withToast(BookForm));

