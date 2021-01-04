import React, { Fragment, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, FlatList, View, Text } from 'react-native';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';
import { ButtonBlock } from 'components/basics/buttons';
import { Form, FormGroup, FormLabel } from 'components/basics/forms';
import { TextAreaWrapper, TextInputWrapper } from 'components/basics/inputs';
import { hideTabBar } from 'utils/interface';

const BooksEditScene = (props) => {
  const { bookId, navigation, route, store } = props;
  const [ book, setBook ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ taskRunning, setTaskRunning ] = useState(false);


  // Hooks
  useEffect(() => {
    fetchData();
    hideTabBar(navigation)
    return () => console.log('rollback...');
  }, [])


  // Methods
  const fetchData = async () => {
    try {
      setLoading(true);
      let model = await store.findRecord('book', route.params.bookId, { include: 'authors' });
      setBook(model);
    } catch(e) {
      console.log('error: ', e);
    } finally {
      setLoading(false);
    }
  }

  const saveForm = async () => {
    try {
      setTaskRunning(true);
      await book.save();
      navigation.goBack();
    } catch(e) {
      console.log('error: ', e);
    } finally {
      setTaskRunning(false);
    }
  }


  // Render
  return (
    <BasicScene>
      <View style={{flex: 1, padding: 15, width: '100%', minHeight: '100%'}}>
        <Form>
          <FormGroup label='Title'>
            <TextInputWrapper
              value={book.title}
              placeholder='Book Title'
              onChangeText={value => book.set('title', value)}
            />
          </FormGroup>

          <FormGroup label='Description'>
            <TextAreaWrapper
              value={book.description}
              placeholder='Tell us about the book...'
              onChangeText={value => book.set('description', value)}
            />
          </FormGroup>

          <FormGroup style={{paddingTop: 15}}>
            <ButtonBlock taskRunning={taskRunning} onPress={() => saveForm()}>Save</ButtonBlock>
          </FormGroup>
        </Form>
      </View>
    </BasicScene>
  );
};

export default withStore(BooksEditScene);
