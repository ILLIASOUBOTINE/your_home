import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.containerForm}>
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
      <Btn1>Submit</Btn1>
    </View>
  );
};

export default FormLogin;
