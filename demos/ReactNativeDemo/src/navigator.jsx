import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withStore } from '@mile-hi-labs/react-data';

// Navs
import MainNavigator from 'navigators/main-navigator';

// Scenes
import WelcomeScene from 'scenes/welcome';

const Stack = createStackNavigator();

const Navigator = (props) => {
  const { store } = props;


  // Render
  return (
  	<NavigationContainer>
	    <Stack.Navigator mode='modal' initialRouteName='Welcome'>

	      <Stack.Screen
	        name='Welcome'
	        component={WelcomeScene}
	        options={{
	          title: 'Welcome',
	        }}
	      />

	      <Stack.Screen
	        name='Main'
	        component={MainNavigator}
        	options={{
            headerShown: false,
          }}
	      />

	    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withStore(Navigator);
