import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Button, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Scenes
import BookIndexScene from 'scenes/books/index';
import BookNewScene from 'scenes/books/new';
import BookDetailScene from 'scenes/books/detail';
import BookEditScene from 'scenes/books/edit';

const Stack = createStackNavigator();


const BookNav = (props) => {
  const { navigation, route } = props;


  // Render
  return (
    <Stack.Navigator initialRouteName='BookIndex'>

      <Stack.Screen
        name='BookIndex'
        component={BookIndexScene}
        options={{
          headerTitle: 'Books'
        }}
      />

      <Stack.Screen
        name='BookNew'
        component={BookNewScene}
        options={{
          headerTitle: 'New Book'
        }}
      />

      <Stack.Screen
        name='BookDetail'
        component={BookDetailScene}
        options={({ route }) => ({
          headerTitle: `Book #${route.params.bookId}`
        })}
      />

      <Stack.Screen
        name='BookEdit'
        component={BookEditScene}
        options={({ route }) => ({
          headerTitle: `Edit Book #${route.params.bookId}`
        })}
      />

    </Stack.Navigator>
  );
};

export default BookNav;
