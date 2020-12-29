import React, { Fragment, useState } from 'react';
import RBToast from 'react-bootstrap/Toast';
import { Fade } from 'components/basics/animations';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { logger } from 'utils/helpers';

const ToastWrapper = (props) => {
  const { children } = props;

  return <div className='toast-wrapper'>{children}</div>
}

const Toast = (props) => {
  const { show, toast, removeToast } = props;
  const [ animation, setAnimation ] = useState('');

  return (
    <Fade show={show} onEnter={() => setAnimation('fade-in-right')} onExit={() => setAnimation('fade-out-right')}>
      <Fragment>
        {toast.type == 'success' && <ToastSuccess toast={toast} animation={animation} removeToast={removeToast} />}
        {toast.type == 'info' && <ToastInfo toast={toast} animation={animation} removeToast={removeToast} />}
        {toast.type == 'error' && <ToastError toast={toast} animation={animation} removeToast={removeToast} />}
      </Fragment>
    </Fade>
  )
}

const ToastSuccess = (props) => {
	const { toast, animation, removeToast } = props;

	// Render
	return (
    <RBToast show={true} className={'success ' + animation} onClose={removeToast}>
      <RBToast.Header closeButton={false}>
      	<FarIcon icon='check'/>
      	<strong className='ml-15 mr-auto'>{toast.message}</strong>
      	<small></small>
    	</RBToast.Header>
    </RBToast>
  )
}

const ToastInfo = (props) => {
const { toast, animation, removeToast } = props;

	// Render
	return (
    <RBToast show={true} className={`info ${animation}`} onClose={removeToast}>
      <RBToast.Header closeButton={false}>
      	<FarIcon icon='info-circle'/>
      	<strong className='ml-15 mr-auto'>{toast.message}</strong>
      	<small></small>
    	</RBToast.Header>
    </RBToast>
  )
}

const ToastError = (props) => {
  const { toast, animation, removeToast } = props;

	// Render
	return (
    <RBToast show={true} className={`error ${animation}`} onClose={removeToast}>
      <RBToast.Header closeButton={false}>
      	<FarIcon icon='times-circle'/>
      	<strong className='ml-15 mr-auto'>{toast.message}</strong>
      	<small></small>
    	</RBToast.Header>
    </RBToast>
  )
}

export { ToastWrapper, Toast, ToastSuccess, ToastInfo, ToastError }

// Docs
// https://react-bootstrap.github.io/components/toasts/
