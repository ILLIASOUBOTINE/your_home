import React from 'react';
import {Text, View} from 'react-native';
import Btn1 from '../../ui/Btn1/Btn1';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TToDoListNavParamList} from '../../../navigation/ToDoListStackNav';
import {NameScreens} from '../../../types/nameScreens';

const TaskAddScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<TToDoListNavParamList>>();
  return (
    <View>
      <Text>TaskAddScreen</Text>
      <Btn1
        onPressBtn={() => {
          navigation.navigate(NameScreens.TASKCOMPLETED);
        }}>
        Screen2
      </Btn1>
    </View>
  );
};

export default TaskAddScreen;
