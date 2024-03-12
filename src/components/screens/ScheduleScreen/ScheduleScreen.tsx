import {Text, View} from 'react-native';

import IconTab from '../../../assets/icon_app/schedule.svg';
import React from 'react';

const ScheduleScreen = () => {
  return (
    <View>
      <Text>ScheduleScreen</Text>
      <View style={{height: 50, width: 50}}>
        <IconTab width={40} height={40} fill={'#19949E'} />
      </View>
    </View>
  );
};

export default ScheduleScreen;
