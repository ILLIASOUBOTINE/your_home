import {StyleProp, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import React from 'react';
import IconFlashRight from '../../../../assets/icon_app/flashRight.svg';
import IconSchedule from '../../../../assets/icon_app/schedule.svg';
import {Colors} from '../../../constans/colors';
import {scaleSize} from '../../../utils/scaleSize';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TTabBottomNavParamList} from '../../../navigation/TabBottomNav';
import {NameScreens} from '../../../types/nameScreens';

export type TTaskBtnProps = {
  children: any;
  style?: StyleProp<any>;
  isSchedule?: boolean;
  idTask: number;
  fromScreen: string;
};

const TaskBtn = ({
  children,
  style,
  isSchedule = false,
  idTask,
  fromScreen,
}: TTaskBtnProps) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TTabBottomNavParamList>>();

  const onPressBtn = () => {
    navigation.navigate(NameScreens.TASKDETAILS, {idTask, fromScreen});
  };

  return (
    <TouchableOpacity style={[styles.containerBtn, style]} onPress={onPressBtn}>
      <View style={styles.containerText}>
        <Text style={styles.textBtn}>{children}</Text>
        {isSchedule ? (
          <View style={styles.containerOptional}>
            <IconSchedule
              fill={Colors.COLOR1}
              width={scaleSize(17)}
              height={scaleSize(13)}
            />
            <Text style={styles.textOptional}>Schedule</Text>
          </View>
        ) : null}
      </View>
      <IconFlashRight
        height={scaleSize(30)}
        width={scaleSize(30)}
        fill={Colors.COLOR1}
      />
    </TouchableOpacity>
  );
};

export default TaskBtn;
