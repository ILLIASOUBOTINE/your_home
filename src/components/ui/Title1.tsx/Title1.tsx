import {StyleProp, Text, View} from 'react-native';
import {styles} from './style';
import React from 'react';

type TTitle1Props = {
  children: string;
  style?: StyleProp<any>;
};

const Title1 = ({children, style}: TTitle1Props) => {
  return <Text style={[styles.textTitle1, style]}>{children}</Text>;
};

export default Title1;
