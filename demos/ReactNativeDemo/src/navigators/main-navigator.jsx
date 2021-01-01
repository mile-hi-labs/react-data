import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Scenes
import BooksScene from 'scenes/main/books';
import AuthorsScene from 'scenes/main/authors';
import CategoriesScene from 'scenes/main/categories';
import PublishersScene from 'scenes/main/publishers';

const Tab = createBottomTabNavigator();

const MainNav = (props) => {
  const { navigation, route } = props;

  // Render
  return (
    <Tab.Navigator initialRouteName='MainBooks'>

      <Tab.Screen
        name='MainBooks'
        component={BooksScene}
        options={{
          title: 'Books',
        }}
      />

      <Tab.Screen
        name='MainAuthors'
        component={AuthorsScene}
        options={{
          title: 'Authors',
        }}
      />

      <Tab.Screen
        name='MainCategories'
        component={CategoriesScene}
        options={{
          title: 'Categories',
        }}
      />

      <Tab.Screen
        name='MainPublishers'
        component={PublishersScene}
        options={{
          title: 'Publishers',
        }}
      />

    </Tab.Navigator>
  );
};

export default MainNav;
