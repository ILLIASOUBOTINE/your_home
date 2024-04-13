import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {NameScreens} from '../../../types/nameScreens';
import {TTabBottomNavParamList} from '../../../navigation/TabBottomNav';
import {stylesGeneral} from '../../stylesGeneral';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import Text1 from '../../ui/Text1/Text1';

type TSettingsProfileParams = {
  setIsEdite: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsProfile = ({setIsEdite}: TSettingsProfileParams) => {
  const navigation =
    useNavigation<StackNavigationProp<TTabBottomNavParamList>>();
  const userData = useSelector((state: RootState) => state.user);

  const editeUser = () => {
    setIsEdite(true);
  };

  return (
    <View style={stylesGeneral.containerForm}>
      <Text1 title="First name" text={userData.firstName} />
      <Text1 title="Last name" text={userData.lastName} />
      <Text1 title="Phone number" text={userData.phoneNumber} />
      <Text1 title="Address" text={userData.address} />

      <Btn1 onPressBtn={editeUser}>Edite</Btn1>
    </View>
  );
};

export default SettingsProfile;
