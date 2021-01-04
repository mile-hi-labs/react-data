import React, { Fragment, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, FlatList, View, Text } from 'react-native';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';
import { ButtonText } from 'components/basics/buttons';
import { hideTabBar } from 'utils/interface';

const BooksNewScene = (props) => {
	const { navigation, route, store } = props;
  const [ book, setBook ] = useState({});
  const [ page, setPage ] = useState(0);
  const [ pageSize, setPageSize ] = useState(10);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);


  // Hooks
  useFocusEffect(
    useCallback(() => {
      createBook();
      hideTabBar(navigation);
      return () => store.removeRecord('book', book);
    }, [])
  );

  // Methods
  const createBook = () => {
    let book = store.createRecord('book', {});
    setBook(book);
  }


  // Render
  return (
    <BasicScene>
      <View style={{flex: 1, padding: 15, width: '100%', minHeight: '100%'}}>

      </View>
    </BasicScene>
  );
};

export default withStore(BooksNewScene);
