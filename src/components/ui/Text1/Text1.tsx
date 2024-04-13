import {StyleProp, Text, View} from 'react-native';
import {styles} from './style';
import React from 'react';

type TText1Props = {
  title: string;
  text: string;
  isRow?: boolean;
  style?: StyleProp<any>;
};

const Text1 = ({title, text, isRow = false, style}: TText1Props) => {
  return (
    <View style={[styles.containerText, style, isRow ? styles.row : null]}>
      <Text style={[styles.textTitle, style]}>{title}</Text>
      <Text style={[styles.text, style]}>{text}</Text>
    </View>
  );
};

export default Text1;
