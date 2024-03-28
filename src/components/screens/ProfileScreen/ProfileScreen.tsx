import {ScrollView, Text} from 'react-native';
import {styles} from './style';
import React from 'react';
import Btn1 from '../../ui/Btn1/Btn1';
import {SetDataString} from '../../../storage/storage';
import {StorageKeys} from '../../../storage/storage-keys';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TAppStackParamList} from '../../../navigation/AppNav';
import {NameNavigators} from '../../../types/nameNavigators';
import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1/Title1';
import FormProfile from '../../general/FormProfile/FormProfile';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<TAppStackParamList>>();
  const firstName = useSelector((state: RootState) => state.user.firstName);
  return (
    <ScrollView
      contentContainerStyle={[
        stylesGeneral.containerScreen,
        styles.containerScroll,
      ]}>
      <Title1>{firstName}</Title1>

      <FormProfile />

      <Btn1
        onPressBtn={async () => {
          await SetDataString(StorageKeys.IS_LOGIN, false);
          navigation.navigate(
            NameNavigators.LOGINANDREGISTRATIONSTACKNAVIGATOR,
          );
        }}>
        Log_out
      </Btn1>
    </ScrollView>
  );
};

export default ProfileScreen;
