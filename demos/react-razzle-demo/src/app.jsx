import React, { useEffect } from 'react';
import { ToastProvider } from 'contexts/toast-context';
import Router from 'router';

// Styles
import FarIcons from 'utils/font-awesome/far-icons';
import 'styles/app.scss';

const App = (props) => {
	const { store, ssrData = {} } = props;

  // Render
  return (
    <ToastProvider>
      <Router ssrData={ssrData} />
    </ToastProvider>
  );
}

export default App;
