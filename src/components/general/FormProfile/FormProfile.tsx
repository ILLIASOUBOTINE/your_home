import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {NameScreens} from '../../../types/nameScreens';
import {TTabBottomNavParamList} from '../../../navigation/TabBottomNav';
import {stylesGeneral} from '../../stylesGeneral';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

const FormProfile = () => {
  const navigation =
    useNavigation<StackNavigationProp<TTabBottomNavParamList>>();
  const userData = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState(userData.email);
  // const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [address, setAddress] = useState(userData.address);
  // const [conformPassword, setConformPassword] = useState('');

  return (
    <View style={stylesGeneral.containerForm}>
      <TextInput
        style={stylesGeneral.input1}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={[stylesGeneral.input1, stylesGeneral.input2]}
        placeholder="Address"
        value={address}
        multiline={true}
        onChangeText={setAddress}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {/* <TextInput
        style={stylesGeneral.input1}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Conform Password"
        value={conformPassword}
        onChangeText={setConformPassword}
      /> */}
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
