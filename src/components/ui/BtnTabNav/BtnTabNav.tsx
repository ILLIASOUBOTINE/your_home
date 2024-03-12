import {Image, View} from 'react-native';
import {styles} from './style';
import React from 'react';
import IconSchedule from '../../../assets/icon_app/schedule.svg';

type Tprops = {
  fill: string;
};

const BtnTabNav = ({fill}: Tprops) => {
  return (
    <View style={styles.containerIcon}>
      <IconSchedule fill={fill} />
    </View>
  );
};

export default BtnTabNav;
