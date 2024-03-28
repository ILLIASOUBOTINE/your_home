import {ActivityIndicator, StyleProp, View} from 'react-native';
import {styles} from './style';
import React from 'react';
import {Colors} from '../../../constans/colors';

type TLoading = {
  style?: StyleProp<any>;
};

const Loading = ({style}: TLoading) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={Colors.COLOR4} />
    </View>
  );
};

export default Loading;
