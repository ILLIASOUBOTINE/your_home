import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
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
    <View style={styles.containerMain}>
      <View style={styles.containerHeader}>
        <Title1>Log_In</Title1>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={stylesGeneral.containerScreen}>
        {isLoading && <Loading />}

        <FormLogin setIsLoading={setIsLoading} />

        <Btn1 onPressBtn={() => navigation.navigate(NameScreens.REGISTRATION)}>
          Registration
        </Btn1>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
