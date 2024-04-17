import {Alert, ScrollView, View} from 'react-native';
import {styles} from './style';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Btn1 from '../../ui/Btn1/Btn1';

import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1/Title1';
import FormProfile from '../../general/FormProfile/FormProfile';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {setIslogin} from '../../../store/userReducer';
import SettingsProfile from '../../general/SettingsProfile/SettingsProfile';

import {RemoveValue, SetDataString} from '../../../storage/storage';
import {StorageKeys} from '../../../storage/storage-keys';
import LoadingModal from '../../ui/LoadingModal/LoadingModal';

import {useNavigation} from '@react-navigation/native';
import {TLoginAndRegistrationNavParamList} from '../../../navigation/LoginAndRegistrationStackNav';
import {StackNavigationProp} from '@react-navigation/stack';
import {NameScreens} from '../../../types/nameScreens';
import {NameCollection} from '../../../constans/nameCollection';

const ProfileScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<TLoginAndRegistrationNavParamList>>();
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const dispatch = useDispatch<AppDispatch>();
  const [isEdite, setIsEdite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = () => {
    auth()
      .signOut()
      .then(async () => {
        dispatch(setIslogin(false));
        await SetDataString(StorageKeys.IS_LOGIN, false);
        await RemoveValue(StorageKeys.UID_USER);

        navigation.navigate(NameScreens.LOGIN);
      })
      .catch(() => {
        Alert.alert('Logout', 'Try logout in again!');
      });
  };

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      const user = auth().currentUser;
      if (user) {
        await firestore()
          .collection(NameCollection.USERS)
          .doc(user.uid)
          .update({
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
          });
        await user.delete();
        dispatch(setIslogin(false));
        await SetDataString(StorageKeys.IS_LOGIN, false);
        await RemoveValue(StorageKeys.UID_USER);
        Alert.alert('Delete Account', 'Account deleted!');
      }
    } catch (error) {
      Alert.alert('Delete Account', 'Try delete account in again!');
    } finally {
      setIsLoading(false);
    }
  };

  const handlerDeleteAccount = () => {
    Alert.alert('Do you wont delete account?', undefined, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteAccount();
        },
      },
    ]);
  };

  return (
    <View style={styles.containerMain}>
      {!isEdite && (
        <View style={styles.containerHeader}>
          <Title1>{firstName}</Title1>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          stylesGeneral.containerScreen,
          styles.containerScroll,
        ]}>
        {isEdite ? (
          <FormProfile setIsEdite={setIsEdite} setIsLoading={setIsLoading} />
        ) : (
          <SettingsProfile setIsEdite={setIsEdite} />
        )}

        {!isEdite && <Btn1 onPressBtn={() => logout()}>Log_out</Btn1>}

        {!isEdite && (
          <Btn1 onPressBtn={() => handlerDeleteAccount()}>Delete account!</Btn1>
        )}

        <LoadingModal isLoading={isLoading} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
