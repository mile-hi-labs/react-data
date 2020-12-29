import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Scenes
import TabOne from 'scenes/tab-one';
import TabTwo from 'scenes/tab-two';

const Tab = createBottomTabNavigator();

const Navigator = (props) => {
  const {} = props;

  // Render
  return (
  	<NavigationContainer>
	    <Tab.Navigator initialRouteName='TabOne'>

	      <Tab.Screen
	        name='TabOne'
	        component={TabOne}
	        options={{
	          title: 'TabOne',
	        }}
	      />

	      <Tab.Screen
	        name='TabTwo'
	        component={TabTwo}
	        options={{
	          title: 'TabTwo',
	        }}
	      />

	    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator
