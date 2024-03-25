import React from 'react';
import {ScrollView} from 'react-native';
import Btn1 from '../../ui/Btn1/Btn1';
import {styles} from './style';
import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1/Title1';
import {useNavigation} from '@react-navigation/native';
import {NameScreens} from '../../../types/nameScreens';
import {StackNavigationProp} from '@react-navigation/stack';
import {TLoginAndRegistrationNavParamList} from '../../../navigation/LoginAndRegistrationStackNav';
import FormLogin from '../../general/FormLogin/FormLogin';

const LoginScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<TLoginAndRegistrationNavParamList>>();

  return (
    <ScrollView contentContainerStyle={stylesGeneral.containerScreen}>
      <Title1>Log_In</Title1>
      <FormLogin />

      <Btn1
        style={styles.btn1Registration}
        onPressBtn={() => navigation.navigate(NameScreens.REGISTRATION)}>
        Registration
      </Btn1>
    </ScrollView>
  );
};

export default LoginScreen;
