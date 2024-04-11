import React, {useState} from 'react';
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
import Loading from '../../ui/Loading/Loading';

const RegistrationScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<TLoginAndRegistrationNavParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={stylesGeneral.containerScreen}>
      {isLoading && <Loading />}
      <Title1>Registration</Title1>
      <FormRegistration setIsLoading={setIsLoading} />

      <Btn1
        style={styles.btn1Login}
        onPressBtn={() => navigation.navigate(NameScreens.LOGIN)}>
        Log_In
      </Btn1>
    </ScrollView>
  );
};

export default RegistrationScreen;
