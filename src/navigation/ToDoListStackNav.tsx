import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NameScreens} from '../types/nameScreens';
import TaskAddScreen from '../components/screens/TaskAddScreen/TaskAddScreen';
import TaskInProgressScreen from '../components/screens/TaskInProgressScreen/TaskInProgressScreen';
import TaskCompletedScreen from '../components/screens/TaskCompletedScreen/TaskCompletedScreen';

export type TToDoListNavParamList = {
  [NameScreens.TASKADD]: undefined;
  [NameScreens.TASKINPROGRESS]: undefined;
  [NameScreens.TASKCOMPLETED]: undefined;
};

const ToDoListNav = createStackNavigator<TToDoListNavParamList>();

const ToDoListStackNav = () => {
  return (
    <ToDoListNav.Navigator
      initialRouteName={NameScreens.TASKINPROGRESS}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        animationEnabled: false,
      }}>
      <ToDoListNav.Screen
        name={NameScreens.TASKADD}
        component={TaskAddScreen}
      />
      <ToDoListNav.Screen
        name={NameScreens.TASKINPROGRESS}
        component={TaskInProgressScreen}
      />
      <ToDoListNav.Screen
        name={NameScreens.TASKCOMPLETED}
        component={TaskCompletedScreen}
      />
    </ToDoListNav.Navigator>
  );
};

export default ToDoListStackNav;
