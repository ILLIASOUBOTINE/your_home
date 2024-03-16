import {createStackNavigator} from '@react-navigation/stack';

import {SafeAreaView} from 'react-native';

import {NameNavigators} from '../types/nameNavigators';
import TabBottonNav from './TabBottomNav';
import React from 'react';
import LoginAndRegistrationStackNav from './LoginAndRegistrationStackNav';

type TAppStackParamList = {
  [NameNavigators.TABBOTTOMNAVIGATOR]: undefined;
  [NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR]: undefined;
};

const AppStack = createStackNavigator<TAppStackParamList>();

const AppNav = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppStack.Navigator
        initialRouteName={NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR}
        screenOptions={() => ({
          gestureEnabled: false,
          headerShown: false,
        })}>
        <AppStack.Screen
          name={NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR}
          component={LoginAndRegistrationStackNav}
        />
        <AppStack.Screen
          name={NameNavigators.TABBOTTOMNAVIGATOR}
          component={TabBottonNav}
        />
      </AppStack.Navigator>
    </SafeAreaView>
  );
};

export default AppNav;
