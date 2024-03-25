import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

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
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Btn1
        onPressBtn={async () => {
          await SetDataString(StorageKeys.IS_LOGIN, true);
          setEmail('');
          setPassword('');
          navigation.navigate(NameNavigators.TABBOTTOMNAVIGATOR);
        }}>
        Submit
      </Btn1>
    </View>
  );
};

export default FormLogin;
