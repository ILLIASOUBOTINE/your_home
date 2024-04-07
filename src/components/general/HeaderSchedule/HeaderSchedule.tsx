import React from 'react';
import {View} from 'react-native';
import IconHome from '../../../../assets/icon_app/home.svg';
import Title1 from '../../ui/Title1/Title1';
import {styles} from './style';

import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {Colors} from '../../../constans/colors';

const HeaderSchedule = () => {
  const userName = useSelector((state: RootState) => state.user.firstName);

  return (
    <View style={styles.container}>
      <IconHome stroke={Colors.COLOR2} strokeWidth={2} />
      <Title1 style={[styles.title, styles.text]}>Hi, {userName}!</Title1>
    </View>
  );
};

export default HeaderSchedule;
