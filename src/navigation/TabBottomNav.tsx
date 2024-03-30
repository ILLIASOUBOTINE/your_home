import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {NameScreens} from '../types/nameScreens';
import MessagesScreen from '../components/screens/MessagesScreen/MessagesScreen';
import ProfileScreen from '../components/screens/ProfileScreen/ProfileScreen';
import ScheduleScreen from '../components/screens/ScheduleScreen/ScheduleScreen';

import IconSchedule from '../../assets/icon_app/schedule.svg';
import IconProfile from '../../assets/icon_app/profile.svg';
import IconMessage from '../../assets/icon_app/message.svg';
import IconToDoList from '../../assets/icon_app/toDoList.svg';
import {Colors} from '../constans/colors';
import {scaleSize} from '../utils/scaleSize';
import {FontSize} from '../constans/fontSize';
import {Fonts} from '../constans/fonts';
import {NameNavigators} from '../types/nameNavigators';
import ToDoListStackNav from './ToDoListStackNav';
import TaskDetailsScreen from '../components/screens/TaskDetailsScreen/TaskDetailsScreen';
import Task from '../types/Task';

export type TTabBottomNavParamList = {
  [NameScreens.MESSAGES]: undefined;
  [NameScreens.PROFILE]: undefined;
  [NameScreens.SCHEDULE]: undefined;
  [NameScreens.TASKDETAILS]: {task: Task; fromScreen: string};
  [NameNavigators.TODOLISTSTACKNAVIGATOR]: undefined;
};

const TabNav = createBottomTabNavigator<TTabBottomNavParamList>();

const TabBottonNav = () => {
  return (
    <TabNav.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.COLOR3,
        tabBarInactiveTintColor: Colors.COLOR1,
        tabBarStyle: {
          height: scaleSize(70),
        },
        tabBarLabelStyle: {
          paddingBottom: scaleSize(5),
          fontSize: FontSize.H5,
          fontFamily: Fonts.INTER500,
        },
      })}>
      <TabNav.Screen
        name={NameScreens.SCHEDULE}
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconSchedule fill={focused ? Colors.COLOR3 : Colors.COLOR1} />
          ),
        }}
      />
      <TabNav.Screen
        name={NameNavigators.TODOLISTSTACKNAVIGATOR}
        component={ToDoListStackNav}
        options={{
          title: 'To-do List',
          tabBarIcon: ({focused}) => (
            <IconToDoList fill={focused ? Colors.COLOR3 : Colors.COLOR1} />
          ),
        }}
      />
      <TabNav.Screen
        name={NameScreens.MESSAGES}
        component={MessagesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconMessage fill={focused ? Colors.COLOR3 : Colors.COLOR1} />
          ),
        }}
      />
      <TabNav.Screen
        name={NameScreens.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconProfile stroke={focused ? Colors.COLOR3 : Colors.COLOR1} />
          ),
        }}
      />
      <TabNav.Screen
        name={NameScreens.TASKDETAILS}
        component={TaskDetailsScreen}
        options={{
          tabBarItemStyle: {display: 'none'}, // non visible
        }}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault(); // Предотвращение нажатия на вкладку
          },
        })}
      />
    </TabNav.Navigator>
  );
};

export default TabBottonNav;
