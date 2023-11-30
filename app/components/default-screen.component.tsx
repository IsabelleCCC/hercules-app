import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from '../components/text.component';
import {Divider, Layout} from '@ui-kitten/components';

interface ScreenProps {
  children?: ReactNode;
}

const DefaultScreenComponent = (props: ScreenProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Divider />
      <Layout style={{flex: 1, padding: 20}}>
        <ScrollView>{props.children}</ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

export default DefaultScreenComponent;

const styles = StyleSheet.create({});
