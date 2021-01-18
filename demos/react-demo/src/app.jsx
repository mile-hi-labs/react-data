import React, { useEffect } from 'react';
import { Store, StoreProvider } from '@mile-hi-labs/react-data';
import { ToastProvider } from 'contexts/toast-context';
import * as Adapters from 'adapters';
import * as Serializers from 'serializers';
import * as Models from 'models';
import Router from 'router';

const apiDomain = 'https://library-api.milehilabs.dev';
const store = new Store({ apiDomain: apiDomain, adapters: Adapters, serializers: Serializers, models: Models });

const App = (props) => {

  // Render
  return (
    <StoreProvider context={store}>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;
