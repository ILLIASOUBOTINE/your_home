import React, {useState} from 'react';
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
import Loading from '../../ui/Loading/Loading';

const LoginScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<TLoginAndRegistrationNavParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView contentContainerStyle={stylesGeneral.containerScreen}>
      {isLoading && <Loading />}
      <Title1>Log_In</Title1>
      <FormLogin setIsLoading={setIsLoading} />

      <Btn1
        style={styles.btn1Registration}
        onPressBtn={() => navigation.navigate(NameScreens.REGISTRATION)}>
        Registration
      </Btn1>
    </ScrollView>
  );
};

export default LoginScreen;
