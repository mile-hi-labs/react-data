import React, { useEffect } from 'react';
import { StoreProvider, StoreContext } from '@mile-hi-labs/react-data';
import { ToastProvider } from 'contexts/toast-context';

import * as Adapters from 'adapters';
import * as Serializers from 'serializers';
import * as Models from 'models';
import Router from 'router';


const App = (props) => {
  const serverDomain = process.env.REACT_APP_SERVER_DOMAIN


  // Hooks
  useEffect(() => {
    console.log('Server Domain: ', serverDomain);
  }, [])


  // Render
  return (
    <StoreProvider adapters={Adapters} serializers={Serializers} models={Models} apiDomain={serverDomain}>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;
