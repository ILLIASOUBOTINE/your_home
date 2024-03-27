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

const FormRegistration = () => {
  const navigation =
    useNavigation<StackNavigationProp<TLoginAndRegistrationNavParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adress, setAdress] = useState('');
  const [conformPassword, setConformPassword] = useState('');

  const addUserToBD = () => {
    firestore()
      .collection('Users')
      .add({
        fistName: firstName,
        lastName: lastName,
        adress: adress,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      })
      .then(() => {
        Alert.alert('Registration', 'User account created!');
        navigation.navigate(NameScreens.LOGIN);
      })
      .catch(error => {
        console.error('addUserToBD', error);
      });
  };

  const handlerRegitration = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        addUserToBD();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('Registration', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Registration', 'That email address is invalid!');
        }

        if (error.code === 'auth/weak-password') {
          console.log('That password is invalid!');
          Alert.alert('Registration', 'That password is invalid!');
        }

        console.error(error);
      });
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
        value={adress}
        multiline={true}
        onChangeText={setAdress}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Email"
        placeholderTextColor={Colors.COLOR1}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Password"
        placeholderTextColor={Colors.COLOR1}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Conform Password"
        placeholderTextColor={Colors.COLOR1}
        value={conformPassword}
        onChangeText={setConformPassword}
      />
      <Btn1 onPressBtn={handlerRegitration}>Submit</Btn1>
    </View>
  );
};

export default FormRegistration;
