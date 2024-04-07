import {StyleProp, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import React from 'react';
import IconTime from '../../../../assets/icon_app/time.svg';
import IconSettings from '../../../../assets/icon_app/settings.svg';
import {Colors} from '../../../constans/colors';
import {scaleSize} from '../../../utils/scaleSize';

import {TaskForRedux} from '../../../types/Task';

export type THeaderListTaskBtnProps = {
  style?: StyleProp<any>;
  tasks: TaskForRedux[];
};

const HeaderListTaskBtn = ({tasks, style}: THeaderListTaskBtnProps) => {
  return (
    <View style={[styles.containerBtn, style]}>
      <View style={styles.containerText}>
        <Text style={styles.textBtn}>{tasks[0].dateSchedule}</Text>

        <View style={styles.containerOptional}>
          <IconTime
            fill={Colors.COLOR1}
            width={scaleSize(17)}
            height={scaleSize(17)}
          />
          <Text style={styles.textOptional}>Schedule</Text>
        </View>
      </View>
      <IconSettings
        height={scaleSize(30)}
        width={scaleSize(30)}
        stroke={Colors.COLOR3}
      />
    </View>
  );
};

export default HeaderListTaskBtn;
