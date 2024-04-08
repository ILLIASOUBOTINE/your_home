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
import {TaskForRedux} from '../../../types/Task';

export type TTaskBtnProps = {
  children: any;
  style?: StyleProp<any>;
  styleLastItem?: StyleProp<any>;
  isScheduleHide?: boolean;
  task: TaskForRedux;
  fromScreen: string;
};

const TaskBtn = ({
  styleLastItem,
  children,
  style,
  task,
  fromScreen,
  isScheduleHide = false,
}: TTaskBtnProps) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TTabBottomNavParamList>>();

  const onPressBtn = () => {
    navigation.navigate(NameScreens.TASKDETAILS, {task, fromScreen});
  };

  return (
    <TouchableOpacity
      style={[styles.containerBtn, style, styleLastItem]}
      onPress={onPressBtn}>
      <View style={styles.containerText}>
        <Text style={[styles.textBtn, style]}>{children}</Text>
        {task.schedule && !isScheduleHide && (
          <View style={styles.containerOptional}>
            <IconSchedule
              fill={Colors.COLOR1}
              width={scaleSize(17)}
              height={scaleSize(13)}
            />
            <Text style={styles.textOptional}>Schedule</Text>
          </View>
        )}
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
