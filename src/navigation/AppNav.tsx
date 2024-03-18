import {createStackNavigator} from '@react-navigation/stack';

import {SafeAreaView} from 'react-native';

import {NameNavigators} from '../types/nameNavigators';
import TabBottonNav from './TabBottomNav';
import React, {useEffect, useState} from 'react';
import LoginAndRegistrationStackNav from './LoginAndRegistrationStackNav';
import {GetDataString} from '../storage/storage';
import {StorageKeys} from '../storage/storage-keys';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {setUserIslogin} from '../store/userReducer';

export type TAppStackParamList = {
  [NameNavigators.TABBOTTOMNAVIGATOR]: undefined;
  [NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR]: undefined;
};

const AppStack = createStackNavigator<TAppStackParamList>();

const AppNav = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const dispatch = useDispatch();
  // const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    GetDataString(StorageKeys.IS_LOGIN)
      .then(value => dispatch(setUserIslogin(true)))
      .catch(e => console.log('Error LocalStorage', e))
      .finally(() => dispatch(setUserIslogin(true)));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppStack.Navigator
        initialRouteName={
          isLogin
            ? NameNavigators.TABBOTTOMNAVIGATOR
            : NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR
        }
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
