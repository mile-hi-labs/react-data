import React, { Fragment, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, FlatList, View, Text } from 'react-native';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';
import { ButtonText } from 'components/basics/buttons';
import { hideTabBar } from 'utils/interface';


const BooksEditScene = (props) => {
  const { bookId, navigation, route, store } = props;
  const [ book, setBook ] = useState({});
  const [ loading, setLoading ] = useState(false);


  // Hooks
  useEffect(() => {
    fetchData();
    hideTabBar(navigation);
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


  // Render
  return (
    <BasicScene>
      <View style={{flex: 1, width: '100%', minHeight: '100%'}}>
        {loading ? <Text>Loading...</Text> : (
          <FlatList
            data={books}
            renderItem={BookCard}
            keyExtractor={book => book.id.toString()}
          />
        )}
      </View>
    </BasicScene>
  );
};

export default withStore(BooksEditScene);
