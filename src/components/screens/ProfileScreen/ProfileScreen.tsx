import {ScrollView, Text} from 'react-native';
import {styles} from './style';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Btn1 from '../../ui/Btn1/Btn1';

import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1/Title1';
import FormProfile from '../../general/FormProfile/FormProfile';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {setIslogin} from '../../../store/userReducer';

const ProfileScreen = () => {
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const dispatch = useDispatch<AppDispatch>();

  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setIslogin(false));
        console.log('User signed out!');
      })
      .catch(() => {});
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        stylesGeneral.containerScreen,
        styles.containerScroll,
      ]}>
      <Title1>{firstName}</Title1>

      <FormProfile />

      <Btn1 onPressBtn={() => Logout()}>Log_out</Btn1>
    </ScrollView>
  );
};

export default ProfileScreen;
