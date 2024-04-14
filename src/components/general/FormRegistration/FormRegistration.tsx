import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert, TextInput, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {TLoginAndRegistrationNavParamList} from '../../../navigation/LoginAndRegistrationStackNav';
import {NameScreens} from '../../../types/nameScreens';
import {stylesGeneral} from '../../stylesGeneral';
import {Colors} from '../../../constans/colors';

type TFormRegistrationParams = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormRegistration = ({setIsLoading}: TFormRegistrationParams) => {
  const navigation =
    useNavigation<StackNavigationProp<TLoginAndRegistrationNavParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [conformPassword, setConformPassword] = useState('');

  const addUserToBD = (uid: string) => {
    firestore()
      .collection('Users')
      .doc(uid)
      .set({
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
      })
      .then(() => {
        Alert.alert('Registration', 'User account created!');
        navigation.navigate(NameScreens.LOGIN);
      })
      .catch(error => {
        throw error;
      });
  };

  const handlerRegitration = () => {
    setIsLoading(true);
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      address.trim().length === 0 ||
      phoneNumber.trim().length === 0
    ) {
      Alert.alert('Registration', ' all fields must be filled in');
      setIsLoading(false);
      return;
    } else if (password.trim().length < 6) {
      Alert.alert('Registration', ' Minimum password lenght 6 characters!');
      setIsLoading(false);
      return;
    } else if (password !== conformPassword) {
      Alert.alert(
        'Registration',
        ' The confirmed password does not match password!',
      );
      setIsLoading(false);
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        addUserToBD(user.uid);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Registration', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Registration', 'That email address is invalid!');
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('Registration', 'That password is invalid!');
        } else {
          Alert.alert('Registration', 'An error occurred during registration');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={stylesGeneral.containerForm}>
      <TextInput
        style={stylesGeneral.input1}
        placeholder="First name"
        placeholderTextColor={Colors.COLOR1}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Last name"
        placeholderTextColor={Colors.COLOR1}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Phone number"
        placeholderTextColor={Colors.COLOR1}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={[stylesGeneral.input1, stylesGeneral.input2]}
        placeholder="Adress"
        placeholderTextColor={Colors.COLOR1}
        value={address}
        multiline={true}
        onChangeText={setAddress}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Email"
        placeholderTextColor={Colors.COLOR1}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Password"
        placeholderTextColor={Colors.COLOR1}
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Conform Password"
        placeholderTextColor={Colors.COLOR1}
        value={conformPassword}
        secureTextEntry={true}
        onChangeText={setConformPassword}
      />
      <Btn1 onPressBtn={handlerRegitration}>Submit</Btn1>
    </View>
  );
};

export default FormRegistration;
