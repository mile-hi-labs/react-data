import React, { useEffect } from 'react';
import { StoreProvider, StoreContext } from '@mile-hi-labs/react-data';

import * as Adapters from './adapters/index';
import * as Serializers from './serializers/index';
import * as Models from './models/index';
import Router from './router';


const App = (props) => {
  const serverDomain = process.env.REACT_APP_SERVER_DOMAIN


  // Hooks
  useEffect(() => {
    console.log('Server Domain: ', serverDomain);
  }, [])

  // Render
  return (
    <StoreProvider adapters={Adapters} serializers={Serializers} models={Models} apiDomain={serverDomain}>
      <Router />
    </StoreProvider>
  );
}

export default App;
