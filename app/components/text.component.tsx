import {View, Text, StyleProp, TextStyle, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';

interface textProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

const TextComponent = (props: textProps) => {
  return (
    <View>
      <Text style={[styles.text, props.style]}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato',
    color: '#fff',
    fontSize: 16,
  },
});

export default TextComponent;
