import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NameScreens} from '../types/nameScreens';
import LoginScreen from '../components/screens/LoginScreen/LoginScreen';
import RegistrationScreen from '../components/screens/RegistrationScreen/RegistrationScreen';

export type TLoginAndRegistrationNavParamList = {
  [NameScreens.LOGIN]: undefined;
  [NameScreens.REGISTRATION]: undefined;
};

const LoginAndRegistrationNav =
  createStackNavigator<TLoginAndRegistrationNavParamList>();

const LoginAndRegistrationStackNav = () => {
  return (
    <LoginAndRegistrationNav.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <LoginAndRegistrationNav.Screen
        name={NameScreens.LOGIN}
        component={LoginScreen}
      />
      <LoginAndRegistrationNav.Screen
        name={NameScreens.REGISTRATION}
        component={RegistrationScreen}
      />
    </LoginAndRegistrationNav.Navigator>
  );
};

export default LoginAndRegistrationStackNav;
