import React from 'react';
import {
  Card,
  Input,
  Layout,
  Button,
  Text,
  TopNavigation,
  Divider,
} from '@ui-kitten/components';
import {Image, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}: {navigation: any}) => {
  const signOut = async () => {
    await AsyncStorage.removeItem('access-token');
    await AsyncStorage.removeItem('refresh-token');
    console.log('Saindo...', await AsyncStorage.getItem('access-token'));
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button appearance="outline" status="warning" onPress={signOut}>
          Sair
        </Button>
        <Image
          source={require('../../../assets/workout.png')}
          style={{width: '100%', maxHeight: 300}}
        />
      </Layout>
    </SafeAreaView>
  );
};

export default Home;
