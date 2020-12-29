import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Modal, ModalBody } from 'components/basics/modals';
import { isEmpty, timeout } from 'utils/helpers';

const LoadingMessage = (props) => {
	const { title, subtitle } = props;

	return (
    <Modal show={true} animation={false} centered={true} size='sm' className='fullpage'>
      <ModalBody>
				<Spinner role='status' animation='border' size='md' className='mb-2' />
				<h4 className='title'>{title}</h4>
				<h6 className='subtitle'>{subtitle}</h6>
			</ModalBody>
		</Modal>
	)

}

export {
	LoadingMessage
}
