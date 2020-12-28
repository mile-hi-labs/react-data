import React, { Fragment, useState } from 'react';
import { ToastWrapper, Toast } from 'components/basics/toasts';
import { timeout, logger } from 'utils/helpers';

export const ToastContext = React.createContext();

const ToastProvider = (props) => {
  const { children } = props;
  const [ show, setShow ] = useState(false);
  const [ toast, setToast ] = useState({});


  // Methods
  const showError = async (err) => {
    setToast({ type: 'error', status: 422, message: buildMsg(err) });
    setShow(true);
    removeToast(3000);
  }

  const showInfo = async (msg) => {
    setToast({ type: 'info', status: 200, message: msg });
    setShow(true);
    removeToast(3000);
  }

  const showSuccess = (msg) => {
    setToast({ type: 'success', status: 200, message: msg })
    setShow(true);
    removeToast(3000);
  }

  const removeToast = async (time = 0) => {
    await timeout(time);
    setShow(false);
  }

  const buildMsg = (err = []) => {
    let message = '';
    logger('Error: ', err);
    if (Array.isArray(err)) {
      err.forEach((error, index) => {
        message = error.detail + "\n";
      });
    } else {
      message = 'Sorry, there was an error.';
    }
    return message;
  }


  // Render
  return (
    <ToastContext.Provider value={{showError, showInfo, showSuccess}}>
      <ToastWrapper>
        <Toast show={show} toast={toast} removeToast={() => removeToast()}/>
      </ToastWrapper>
      {children}
    </ToastContext.Provider>
  )
}


const withToast = function(WrappedComponent) {
  return (props) => (
    <ToastContext.Consumer>
      {context => <WrappedComponent toast={context} {...props}/>}
    </ToastContext.Consumer>
  )
}

export { ToastProvider, withToast }

