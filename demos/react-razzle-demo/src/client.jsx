import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Store, StoreProvider } from '@mile-hi-labs/react-data';
import App from 'app';

// Store
import * as Adapters from 'adapters';
import * as Serializers from 'serializers';
import * as Models from 'models';


const apiDomain = 'https://library-api.milehilabs.dev';
const ssrData = window.REACT_DATA || {};
const store = new Store({ apiDomain: apiDomain, adapters: Adapters, serializers: Serializers, models: Models });

hydrate(
	<HelmetProvider>
		<StoreProvider context={store} data={ssrData}>
	  	<BrowserRouter>
	    	<App ssrData={ssrData} />
	  	</BrowserRouter>
  	</StoreProvider>
	</HelmetProvider>,
  document.getElementById('root')
);


if (module.hot) {
  module.hot.accept();
}
