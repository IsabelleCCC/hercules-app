import {StyleProp, TextStyle, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {Layout} from '@ui-kitten/components';

interface rowProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

const RowComponent = (props: rowProps) => {
  return <Layout style={[styles.row, props.style]}>{props.children}</Layout>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default RowComponent;
