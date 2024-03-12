import {createStackNavigator} from '@react-navigation/stack';

import {SafeAreaView} from 'react-native';

import {NameNavigatorststs} from '../types/nameNavigators';
import TabBottonNav from './TabBottomNav';
import React from 'react';

type TAppStackParamList = {
  [NameNavigatorststs.TABBOTTOMNAVIGATOR]: undefined;
};

const AppStack = createStackNavigator<TAppStackParamList>();

const AppNav = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppStack.Navigator
        screenOptions={() => ({
          gestureEnabled: false,
          headerShown: false,
        })}>
        <AppStack.Screen
          name={NameNavigatorststs.TABBOTTOMNAVIGATOR}
          component={TabBottonNav}
        />
      </AppStack.Navigator>
    </SafeAreaView>
  );
};

export default AppNav;
