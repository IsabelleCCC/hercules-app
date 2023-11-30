import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from '../components/text.component';
import {Divider, Layout, Spinner} from '@ui-kitten/components';

interface ScreenProps {
  children?: ReactNode;
}

const LoadingScreenComponent = (props: ScreenProps): React.ReactElement => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, padding: 20}}>
        <Spinner status="warning" />
      </Layout>
    </SafeAreaView>
  );
};

export default LoadingScreenComponent;
