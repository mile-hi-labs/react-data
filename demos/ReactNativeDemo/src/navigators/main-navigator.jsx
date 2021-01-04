import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Scenes
import BooksNav from 'navigators/book-nav';
import AuthorsScene from 'scenes/authors/index';

const Tab = createBottomTabNavigator();

const MainNav = (props) => {
  const { navigation, route } = props;

  // Render
  return (
    <Tab.Navigator initialRouteName='MainBooks'>

      <Tab.Screen
        name='MainBooks'
        component={BooksNav}
      />

      <Tab.Screen
        name='MainAuthors'
        component={AuthorsScene}
      />

    </Tab.Navigator>
  );
};

export default MainNav;
