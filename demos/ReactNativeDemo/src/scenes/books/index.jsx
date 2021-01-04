import React, { Fragment, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, FlatList, View, Text } from 'react-native';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';
import { BookListCard } from 'components/book/book-card';
import { ButtonText, ButtonWrapper } from 'components/basics/buttons';
import { showTabBar } from 'utils/interface';

const BooksIndexScene = (props) => {
	const { navigation, route, store } = props;
  const [ books, setBooks ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ pageSize, setPageSize ] = useState(10);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);


  // Hooks
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <ButtonText
          style={{paddingRight: 15}}
          onPress={() => navigation.navigate('MainBooks', { screen: 'BookNew' })}>
          Add New
        </ButtonText>
      ),
    })
  });

  useFocusEffect(
    useCallback(() => {
      fetchData();
      showTabBar(navigation);
    }, [])
  );

  // Methods
  const fetchData = async () => {
    try {
      setLoading(true);
      let model = await store.query('book', {
        page: page,
        pageSize: pageSize,
        sortProp: 'id',
        sortValue: 'desc',
        include: 'authors'
      });
      setBooks(model);
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
            keyExtractor={book => book.id.toString()}
            renderItem={({ item }) => (
              <BookListCard
                book={item}
                onPress={book => navigation.navigate('MainBooks', { screen: 'BookDetail', params: { bookId: book.id }})}
              />
            )}
          />
        )}
      </View>
    </BasicScene>
  );
};

export default withStore(BooksIndexScene);
