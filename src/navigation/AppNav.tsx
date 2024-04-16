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

import {StorageKeys} from '../storage/storage-keys';
import {GetDataString} from '../storage/storage';
import LoadingModal from '../components/ui/LoadingModal/LoadingModal';
import {NameScreens} from '../types/nameScreens';

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

    const storedIsLogin = await GetDataString(StorageKeys.IS_LOGIN);

    const storedUIDUser = await GetDataString(StorageKeys.UID_USER);

    const currentUserFirebase = auth().currentUser?.uid;

    if (
      storedIsLogin &&
      storedUIDUser &&
      storedUIDUser === currentUserFirebase
    ) {
      dispatch(setIslogin(true));

      await dispatch(fetchUserById(storedUIDUser));
      await dispatch(fetchTasksByUserId(storedUIDUser));
      await dispatch(fetchMessagesByUserId(storedUIDUser));
      setIsLoading(false);
    } else {
      dispatch(setIslogin(false));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppStack.Navigator
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
