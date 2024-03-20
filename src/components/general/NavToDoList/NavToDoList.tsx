import React from 'react';
import {View} from 'react-native';

import {styles} from './style';
import Btn2 from '../../ui/Btn2/Btn2';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {NameScreens} from '../../../types/nameScreens';
import {TToDoListNavParamList} from '../../../navigation/ToDoListStackNav';
import {StackNavigationProp} from '@react-navigation/stack';

const NavToDoList = () => {
  const navigationState = useNavigationState(state => state);
  const navigation =
    useNavigation<StackNavigationProp<TToDoListNavParamList>>();

  const getButtonStyle = (screenName: keyof TToDoListNavParamList) => {
    if (navigationState.routes[navigationState.index].name === screenName) {
      return styles.activeButton;
    }
  };

  const pressBtn2 = (screenName: keyof TToDoListNavParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.navTodoList}>
      <Btn2
        style={getButtonStyle(NameScreens.TASKADD)}
        onPressBtn={() => pressBtn2(NameScreens.TASKADD)}>
        Add
      </Btn2>
      <Btn2
        style={getButtonStyle(NameScreens.TASKINPROGRESS)}
        onPressBtn={() => pressBtn2(NameScreens.TASKINPROGRESS)}>
        In-progress
      </Btn2>
      <Btn2
        style={getButtonStyle(NameScreens.TASKCOMPLETED)}
        onPressBtn={() => pressBtn2(NameScreens.TASKCOMPLETED)}>
        Completed
      </Btn2>
    </View>
  );
};

export default NavToDoList;
