import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {NameScreens} from '../types/nameScreens';
import MessagesScreen from '../components/screens/MessagesScreen/MessagesScreen';
import ProfileScreen from '../components/screens/ProfileScreen/ProfileScreen';
import ScheduleScreen from '../components/screens/ScheduleScreen/ScheduleScreen';
import ToDoListScreen from '../components/screens/ToDoListScreen/ToDoListScreen';
import IconSchedule from '../assets/icon_app/schedule.svg';
import IconProfile from '../assets/icon_app/profile.svg';
import IconMessage from '../assets/icon_app/message.svg';
import IconToDoList from '../assets/icon_app/toDoList.svg';

export type TTabBottomNavParamList = {
  [NameScreens.MESSAGES]: undefined;
  [NameScreens.PROFILE]: undefined;
  [NameScreens.SCHEDULE]: undefined;
  [NameScreens.TODOLIST]: undefined;
};

const TabNav = createBottomTabNavigator<TTabBottomNavParamList>();

const TabBottonNav = () => {
  return (
    <TabNav.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: '#19949E',
      })}>
      <TabNav.Screen
        name={NameScreens.SCHEDULE}
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconSchedule fill={focused ? '#19949E' : '#A6A6A6'} />
          ),
        }}
      />
      <TabNav.Screen
        name={NameScreens.TODOLIST}
        component={ToDoListScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconToDoList fill={focused ? '#19949E' : '#A6A6A6'} />
          ),
        }}
      />
      <TabNav.Screen
        name={NameScreens.MESSAGES}
        component={MessagesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconMessage fill={focused ? '#19949E' : '#A6A6A6'} />
          ),
        }}
      />
      <TabNav.Screen
        name={NameScreens.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconProfile stroke={focused ? '#19949E' : '#A6A6A6'} />
          ),
        }}
      />
    </TabNav.Navigator>
  );
};

export default TabBottonNav;
