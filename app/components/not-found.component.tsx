import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from '../components/text.component';
import {Divider, Layout} from '@ui-kitten/components';

interface NotFoundProps {
  children: ReactNode;
}

const NotFoundComponent = (props: NotFoundProps) => {
  return (
    <Layout style={{flex: 1, alignItems: 'center', marginTop: 40}}>
      <Image
        source={require('../../assets/workout.png')}
        style={{width: '100%', maxHeight: 300}}
      />
      <TextComponent style={{marginTop: 20}}>{props.children}</TextComponent>
    </Layout>
  );
};

export default NotFoundComponent;

const styles = StyleSheet.create({});
