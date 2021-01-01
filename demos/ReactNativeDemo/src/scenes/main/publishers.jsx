import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, Button, StatusBar } from 'react-native';
import { withStore } from '@mile-hi-labs/react-data';
import { useFocusEffect } from '@react-navigation/native';
import { BasicScene } from 'components/basics/scenes';

const PublishersScene = (props) => {
	const { navigation, route, store } = props;
  const [ publishers, setPublishers ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);


  // Hooks
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  )


  // Methods
  const fetchData = async () => {
    try {
      setLoading(true);
      let model = await store.query('publisher', {});
      setPublishers(model);
    } catch (e) {
      console.log('error: ', e);
    } finally {
      setLoading(false);
    }
  }

  const refreshData = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }


  // Render
  return (
    <BasicScene>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100%'}}>
          {loading ? <Text>Loading...</Text> : (
            <Fragment>
              {publishers.length > 0 && publishers.map(publisher => (
                <View key={publisher.id} style={{padding: 15, marginBottom: 15, width: '100%'}}>
                  <Text>{publisher.name}</Text>
                </View>
              ))}
            </Fragment>
          )}
        </View>
      </ScrollView>
    </BasicScene>
  );
};

export default withStore(PublishersScene);
