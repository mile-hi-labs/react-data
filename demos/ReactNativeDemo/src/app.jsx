import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StoreProvider } from '@mile-hi-labs/react-data';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Adapters from 'adapters';
import * as Models from 'models';
import * as Serializers from 'serializers';
import Navigator from 'navigator';

const App = (props) => {
	const apiDomain = 'https://library-api.milehilabs.dev';


  // Render
  return (
    <SafeAreaProvider>
      <StoreProvider adapters={Adapters} serializers={Serializers} models={Models} apiDomain={apiDomain}>
        <Navigator />
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default App;
