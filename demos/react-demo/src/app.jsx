import React, { useEffect } from 'react';
import { StoreProvider } from '@mile-hi-labs/react-data';
import { ToastProvider } from 'contexts/toast-context';
import * as Adapters from 'adapters';
import * as Serializers from 'serializers';
import * as Models from 'models';
import Router from 'router';


const App = (props) => {
  const apiDomain = 'http://localhost:8080';


  // Render
  return (
    <StoreProvider adapters={Adapters} serializers={Serializers} models={Models} apiDomain={apiDomain}>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;
