import {StyleProp, TextInput} from 'react-native';
import {styles} from './style';
import React from 'react';
import {Colors} from '../../../constans/colors';

type TInput1Props = {
  style?: StyleProp<any>;
  placeHolder?: string;
  value?: string;
};

const Input1 = ({style, placeHolder, value = ''}: TInput1Props) => {
  return (
    <TextInput
      style={[styles.input1, style]}
      value={value}
      placeholder={placeHolder}
      placeholderTextColor={Colors.COLOR1}
    />
  );
};

export default Input1;
