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
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {fetchUserById} from '../../../store/userReducer';
import {fetchTasksByUserId} from '../../../store/taskReducer';

type TFormLoginParams = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormLogin = ({setIsLoading}: TFormLoginParams) => {
  const navigation = useNavigation<StackNavigationProp<TAppStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const userData = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlerLogin = () => {
    setIsLoading(true);

    if (!email || !password) {
      Alert.alert('Login', 'Email or password cannot be empty!');
      setIsLoading(false);
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await SetDataString(StorageKeys.IS_LOGIN, true);
        setEmail('');
        setPassword('');
        console.log('User signed in successfully!');
        const user = auth().currentUser;
        if (user) {
          await dispatch(fetchUserById(user.uid));
          await dispatch(fetchTasksByUserId(user.uid));
        }
        navigation.navigate(NameNavigators.TABBOTTOMNAVIGATOR);
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('No user found with this email address!');
          Alert.alert('Login', 'No user found with this email address!');
        } else if (error.code === 'auth/invalid-email') {
          console.log('The email address is badly formatted!');
          Alert.alert('Login', 'The email address is badly formatted!');
        } else if (error.code === 'auth/wrong-password') {
          console.log('The password is invalid for this user!');
          Alert.alert('Login', 'The password is invalid for this user!');
        } else if (error.code === 'auth/invalid-credential') {
          console.log('That password is invalid!');
          Alert.alert('Login', 'That password is invalid!');
        } else {
          Alert.alert('Login', 'Try logging in again!');
          console.error(error);
        }
      })
      .finally(() => setIsLoading(false));
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
        // secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Btn1 onPressBtn={handlerLogin}>Submit</Btn1>
    </View>
  );
};

export default FormLogin;
