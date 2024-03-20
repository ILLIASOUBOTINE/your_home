import {StyleProp, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import React from 'react';

type TBtnProps = {
  children: string;
  style?: StyleProp<any>;

  onPressBtn?: () => void;
};

const Btn2 = ({children, style, onPressBtn}: TBtnProps) => {
  return (
    <TouchableOpacity style={[styles.containerBtn, style]} onPress={onPressBtn}>
      <Text style={[styles.textBtn, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Btn2;
