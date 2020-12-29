import React from 'react';
import RbModal from 'react-bootstrap/Modal';
import { logger } from 'utils/helpers';

const Modal = (props) => {
  const { title, toggleModal, show = false, size = 'lg', animation = true, centered = false, scrollable = true, className = '', children } = props;

  return (
    <RbModal
      show={show}
      size={size}
      animation={animation}
      centered={centered}
      scrollable={scrollable}
      onHide={toggleModal}
      className={className}>
      {title && <ModalHeader title={title} toggleModal={toggleModal}/>}
      {children && children}
    </RbModal>
  )
}

const ModalHeader = (props) => {
	const { title, toggleModal, className = '', children } = props;

	return (
		<RbModal.Header closeButton={true} onHide={toggleModal} className={className + ' flex-between'}>
			{title && <h4 className='title'>{title}</h4>}
			{children && children}
		</RbModal.Header>
	)
}

const ModalBody = (props) => {
	const { size = '', className = '', children } = props;

	return (
		<RbModal.Body className={className + ' ' + size}>
			{children && children}
		</RbModal.Body>
	)
}

const ModalFooter = (props) => {
  const { className = '', children } = props;

  return (
    <RbModal.Footer className={className}>
      {children && children}
    </RbModal.Footer>
  )
}

export { Modal, ModalHeader, ModalBody, ModalFooter }

// Docs
// https://react-bootstrap.github.io/components/modals
