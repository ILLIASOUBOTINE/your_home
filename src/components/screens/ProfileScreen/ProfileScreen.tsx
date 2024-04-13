import {ActivityIndicator, Modal, ScrollView, Text} from 'react-native';
import {styles} from './style';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import Btn1 from '../../ui/Btn1/Btn1';

import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1/Title1';
import FormProfile from '../../general/FormProfile/FormProfile';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {setIslogin} from '../../../store/userReducer';
import SettingsProfile from '../../general/SettingsProfile/SettingsProfile';
import {Colors} from '../../../constans/colors';

const ProfileScreen = () => {
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const dispatch = useDispatch<AppDispatch>();
  const [isEdite, setIsEdite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      {!isEdite && <Title1>{firstName}</Title1>}

      {isEdite ? (
        <FormProfile setIsEdite={setIsEdite} setIsLoading={setIsLoading} />
      ) : (
        <SettingsProfile setIsEdite={setIsEdite} />
      )}

      {!isEdite && <Btn1 onPressBtn={() => Logout()}>Log_out</Btn1>}

      {/* <Modal transparent={true} visible={isLoading}>
        <ActivityIndicator
          style={styles.madal}
          size={'large'}
          color={Colors.COLOR4}
        />
      </Modal> */}
    </ScrollView>
  );
};

export default ProfileScreen;
