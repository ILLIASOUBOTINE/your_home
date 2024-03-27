import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert, TextInput, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';
import {SetDataString} from '../../../storage/storage';
import {StorageKeys} from '../../../storage/storage-keys';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TAppStackParamList} from '../../../navigation/AppNav';
import {NameNavigators} from '../../../types/nameNavigators';
import {stylesGeneral} from '../../stylesGeneral';

const FormLogin = () => {
  const navigation = useNavigation<StackNavigationProp<TAppStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlerLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        SetDataString(StorageKeys.IS_LOGIN, true);
        setEmail('');
        setPassword('');
        console.log('User signed in successfully!');

        navigation.navigate(NameNavigators.TABBOTTOMNAVIGATOR);
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('No user found with this email address!');
          Alert.alert('Login', 'No user found with this email address!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('The email address is badly formatted!');
          Alert.alert('Login', 'The email address is badly formatted!');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('The password is invalid for this user!');
          Alert.alert('Login', 'The password is invalid for this user!');
        }

        console.error(error);
      });
  };

  return (
    <View style={stylesGeneral.containerForm}>
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Password"
        value={password}
        // secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Btn1 onPressBtn={handlerLogin}>Submit</Btn1>
    </View>
  );
};

export default FormLogin;
