import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {TLoginAndRegistrationNavParamList} from '../../../navigation/LoginAndRegistrationStackNav';
import {NameScreens} from '../../../types/nameScreens';
import {TTabBottomNavParamList} from '../../../navigation/TabBottomNav';

const FormProfile = () => {
  const navigation =
    useNavigation<StackNavigationProp<TTabBottomNavParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adress, setAdress] = useState('');
  const [conformPassword, setConformPassword] = useState('');

  return (
    <View style={styles.containerForm}>
      <TextInput
        style={styles.input1}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input1}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input1}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={[styles.input1, styles.input2]}
        placeholder="Adress"
        value={adress}
        multiline={true}
        onChangeText={setAdress}
      />
      <TextInput
        style={styles.input1}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input1}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input1}
        placeholder="Conform Password"
        value={conformPassword}
        onChangeText={setConformPassword}
      />
      <Btn1
        onPressBtn={() => {
          navigation.navigate(NameScreens.PROFILE);
        }}>
        Apply
      </Btn1>
    </View>
  );
};

export default FormProfile;
