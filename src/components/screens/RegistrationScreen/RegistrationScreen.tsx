import React from 'react';
import {ScrollView} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1/Title1';
import Btn1 from '../../ui/Btn1/Btn1';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TLoginAndRegistrationNavParamList} from '../../../navigation/LoginAndRegistrationStackNav';
import {NameScreens} from '../../../types/nameScreens';
import {styles} from './style';
import FormRegistration from '../../general/FormRegistration/FormRegistration';

const RegistrationScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<TLoginAndRegistrationNavParamList>>();

  return (
    <ScrollView contentContainerStyle={stylesGeneral.containerScreen}>
      <Title1>Registration</Title1>
      <FormRegistration />

      <Btn1
        style={styles.btn1Login}
        onPressBtn={() => navigation.navigate(NameScreens.LOGIN)}>
        Log_In
      </Btn1>
    </ScrollView>
  );
};

export default RegistrationScreen;
