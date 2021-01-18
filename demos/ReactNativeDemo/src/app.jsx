import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Store, StoreProvider } from '@mile-hi-labs/react-data';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Adapters from 'adapters';
import * as Models from 'models';
import * as Serializers from 'serializers';
import Navigator from 'navigator';

const apiDomain = 'https://library-api.milehilabs.dev';
const store = new Store({ apiDomain: apiDomain, adapters: Adapters, serializers: Serializers, models: Models });

const App = (props) => {
  // Render
  return (
    <SafeAreaProvider>
      <StoreProvider context={store}>
        <Navigator />
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default App;
