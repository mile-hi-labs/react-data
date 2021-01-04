import React, { Fragment, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, FlatList, View, Text } from 'react-native';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';
import { ButtonText } from 'components/basics/buttons';
import { hideTabBar } from 'utils/interface';

const BooksDetailScene = (props) => {
	const { bookId, navigation, route, store } = props;
  const [ book, setBook ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ taskRunning, setTaskRunning ] = useState(false);


  // Hooks
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <ButtonText
          style={{paddingRight: 15}}
          onPress={() => navigation.navigate('MainBooks', { screen: 'BookEdit', params: { bookId: book.id }})}>
          Edit
        </ButtonText>
      ),
    })
  });

  useFocusEffect(
    useCallback(() => {
      fetchData();
      hideTabBar(navigation);
    }, [])
  );

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

  const destroyBook = async () => {
    try {
      setTaskRunning(true);
      await book.destroy();
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
      <View style={{flex: 1, width: '100%', minHeight: '100%'}}>
        {loading ? <Text>Loading...</Text> : (
          <View style={{padding: 15, marginBottom: 15, width: '100%', borderBottomWidth: 0.5, borderColor: '#9EA7B3'}}>
            <Text>{book.printType}</Text>
            <Text style={{fontSize: 16, fontWeight: '500'}}>{book.title}</Text>
            <Text>{book.previewDescription}</Text>
            <View style={{paddingTop: 15, paddingBottom: 15}}>
              <ButtonText
                taskRunning={taskRunning}
                onPress={() => destroyBook()}>
                Delete Book
              </ButtonText>
            </View>
          </View>
        )}
      </View>
    </BasicScene>
  );
};

export default withStore(BooksDetailScene);
