import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native';

import {NameNavigators} from '../types/nameNavigators';
import TabBottonNav from './TabBottomNav';
import React, {useEffect, useState} from 'react';
import LoginAndRegistrationStackNav from './LoginAndRegistrationStackNav';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {fetchUserById, setIslogin} from '../store/userReducer';
import {fetchTasksByUserId} from '../store/taskReducer';
import {fetchMessagesByUserId} from '../store/messageReducer';

export type TAppStackParamList = {
  [NameNavigators.TABBOTTOMNAVIGATOR]: undefined;
  [NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR]: undefined;
};

const AppStack = createStackNavigator<TAppStackParamList>();

const AppNav = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // console.log('Is auth', auth().currentUser);
    auth().onAuthStateChanged(async user => {
      if (user) {
        if (!isLogin) {
          dispatch(setIslogin(true));
        }

        await dispatch(fetchUserById(user.uid));
        await dispatch(fetchTasksByUserId(user.uid));
        await dispatch(fetchMessagesByUserId(user.uid));
      } else {
        dispatch(setIslogin(false));
      }
    });
  }, []);

  // useEffect(() => {
  //   auth().onAuthStateChanged(async user => {
  //     if (user) {
  //       await dispatch(fetchUserById(user.uid));
  //       await dispatch(fetchTasksByUserId(user.uid));
  //       await dispatch(fetchMessagesByUserId(user.uid));
  //     }
  //   });
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppStack.Navigator
        // initialRouteName={
        //   isLog
        //     ? NameNavigators.TABBOTTOMNAVIGATOR
        //     : NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR
        // }
        screenOptions={() => ({
          gestureEnabled: false,
          headerShown: false,
        })}>
        {!isLogin && (
          <AppStack.Screen
            name={NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR}
            component={LoginAndRegistrationStackNav}
          />
        )}
        {isLogin && (
          <AppStack.Screen
            name={NameNavigators.TABBOTTOMNAVIGATOR}
            component={TabBottonNav}
          />
        )}
      </AppStack.Navigator>
    </SafeAreaView>
  );
};

export default AppNav;
