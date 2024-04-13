import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, Modal, SafeAreaView} from 'react-native';

import {NameNavigators} from '../types/nameNavigators';
import TabBottonNav from './TabBottomNav';
import React, {useEffect, useState} from 'react';
import LoginAndRegistrationStackNav from './LoginAndRegistrationStackNav';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {fetchUserById, setIslogin} from '../store/userReducer';
import {fetchTasksByUserId} from '../store/taskReducer';
import {fetchMessagesByUserId} from '../store/messageReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from '../storage/storage-keys';
import {GetDataString} from '../storage/storage';
import LoadingModal from '../components/ui/LoadingModal/LoadingModal';

export type TAppStackParamList = {
  [NameNavigators.TABBOTTOMNAVIGATOR]: undefined;
  [NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR]: undefined;
};

const AppStack = createStackNavigator<TAppStackParamList>();

const AppNav = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    setIsLoading(true);
    // Получаем информацию о текущем пользователе из хранилища

    const storedIsLogin = await GetDataString(StorageKeys.IS_LOGIN);
    console.log('IsLoginStore', storedIsLogin);

    const storedUIDUser = await GetDataString(StorageKeys.UID_USER);
    console.log('idStore', storedUIDUser);
    const currentUserFirebase = auth().currentUser?.uid;
    console.log('idFirebaseStore', currentUserFirebase);
    if (
      storedIsLogin &&
      storedUIDUser &&
      storedUIDUser === currentUserFirebase
    ) {
      // Если информация о пользователе найдена в хранилище, устанавливаем статус входа
      dispatch(setIslogin(true));

      await dispatch(fetchUserById(storedUIDUser));
      await dispatch(fetchTasksByUserId(storedUIDUser));
      await dispatch(fetchMessagesByUserId(storedUIDUser));
      setIsLoading(false);
    } else {
      // Если информация о пользователе не найдена, устанавливаем статус выхода
      dispatch(setIslogin(false));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // useEffect(() => {
  //   // console.log('Is auth', auth().currentUser);
  //   auth().onAuthStateChanged(async user => {
  //     if (user) {
  //       if (!isLogin) {
  //         dispatch(setIslogin(true));
  //       }

  //       await dispatch(fetchUserById(user.uid));
  //       await dispatch(fetchTasksByUserId(user.uid));
  //       await dispatch(fetchMessagesByUserId(user.uid));
  //     } else {
  //       dispatch(setIslogin(false));
  //     }
  //   });
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppStack.Navigator
        // initialRouteName={
        //   isLogin
        //     ? NameNavigators.TABBOTTOMNAVIGATOR
        //     : NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR
        // }
        screenOptions={() => ({
          gestureEnabled: false,
          headerShown: false,
        })}>
        {!isLogin ? (
          <AppStack.Screen
            name={NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR}
            component={LoginAndRegistrationStackNav}
          />
        ) : (
          <AppStack.Screen
            name={NameNavigators.TABBOTTOMNAVIGATOR}
            component={TabBottonNav}
          />
        )}
      </AppStack.Navigator>
      <LoadingModal isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default AppNav;
