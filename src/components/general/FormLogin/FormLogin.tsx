import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';
import {GetDataString, SetDataString} from '../../../storage/storage';
import {StorageKeys} from '../../../storage/storage-keys';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TAppStackParamList} from '../../../navigation/AppNav';
import {NameNavigators} from '../../../types/nameNavigators';
import {stylesGeneral} from '../../stylesGeneral';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {fetchUserById, setIslogin} from '../../../store/userReducer';
import {fetchTasksByUserId} from '../../../store/taskReducer';
import {fetchMessagesByUserId} from '../../../store/messageReducer';
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';

type TFormLoginParams = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormLogin = ({setIsLoading}: TFormLoginParams) => {
  const navigation = useNavigation<StackNavigationProp<TAppStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [isModalClose, setIsModalClose] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlerLogin = async () => {
    setIsLoading(true);

    if (email.trim().length === 0 || password.trim().length === 0) {
      Alert.alert('Login', 'Email or password cannot be empty!');
      setIsLoading(false);
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);

      setEmail('');
      setPassword('');

      const user = auth().currentUser;

      if (user) {
        await SetDataString(StorageKeys.IS_LOGIN, true);
        await SetDataString(StorageKeys.UID_USER, user.uid);
        const storedUIDUser = await GetDataString(StorageKeys.UID_USER);

        dispatch(setIslogin(true));

        await dispatch(fetchUserById(user.uid));
        await dispatch(fetchTasksByUserId(user.uid));
        await dispatch(fetchMessagesByUserId(user.uid));
        navigation.navigate(NameNavigators.TABBOTTOMNAVIGATOR);
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Login', 'No user found with this email address!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Login', 'The email address is badly formatted!');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Login', 'The password is invalid for this user!');
      } else if (error.code === 'auth/invalid-credential') {
        Alert.alert('Login', 'That password is invalid!');
      } else {
        Alert.alert('Login', 'Try logging in again!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={stylesGeneral.containerForm}>
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => setIsModalClose(true)}>
        <Text style={styles.textForgot}>Forgot password?</Text>
      </TouchableOpacity>

      {isModalClose && (
        <ForgotPasswordModal setIsModalClose={setIsModalClose} />
      )}

      <Btn1 onPressBtn={handlerLogin}>Submit</Btn1>
    </View>
  );
};

export default FormLogin;
