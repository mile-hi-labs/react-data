import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'components/basics/buttons';
import { BasicScene } from 'components/basics/scenes';

const WelcomeScene = (props) => {
	const { navigation, route, store } = props;


  // Render
  return (
    <BasicScene>
      <View style={{flex: 1, justifyContent: 'center', width: '100%', height: '100%', padding: 15}}>
        <Text style={{fontSize: 24, marginBottom: 10}}>React Data Demo</Text>
        <Text style={{fontSize: 16, marginBottom: 16}}>
          This is a demo application for React data.
          The app connects to a remote API service and then showcases how you might use the store in a typical fashion.
          Take a peek at the adapters, serializers, and models to see how they interconnect.
        </Text>
        <Button onPress={() => navigation.navigate('Main')}>Get Started</Button>
      </View>
    </BasicScene>
  );
};

export default WelcomeScene;
