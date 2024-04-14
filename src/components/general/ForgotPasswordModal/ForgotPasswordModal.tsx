import React, {useState} from 'react';

import {
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import IconFlashGoBack from '../../../../assets/icon_app/flashGoBack.svg';
import {scaleSize} from '../../../utils/scaleSize';
import auth from '@react-native-firebase/auth';
import Btn1 from '../../ui/Btn1/Btn1';
import LoadingModal from '../../ui/LoadingModal/LoadingModal';

type TForgotPasswordModalParams = {
  setIsModalClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPasswordModal = ({setIsModalClose}: TForgotPasswordModalParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    setIsLoading(true);
    if (email.trim().length === 0) {
      Alert.alert('Reset password', 'Email cannot be empty!');
      setIsLoading(false);
      return;
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsLoading(false);
        Alert.alert(
          'Password reset email sent',
          'Please check your email and follow the instructions to reset your password!',
        );
        handleCloseModal();
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert('Password reset error', 'Please try again');
      });
  };

  const handleCloseModal = () => {
    setIsModalClose(false);
  };

  return (
    <Modal visible={true} transparent={true}>
      <TouchableOpacity
        style={styles.containerHeader}
        onPress={handleCloseModal}>
        <IconFlashGoBack height={scaleSize(30)} width={scaleSize(30)} />
      </TouchableOpacity>

      <View style={[stylesGeneral.containerScreen, styles.containerMain]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <TextInput
            autoCapitalize="none"
            style={stylesGeneral.input1}
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
          />

          <Btn1 onPressBtn={handleResetPassword}>Reset password</Btn1>
        </ScrollView>
      </View>
      <LoadingModal isLoading={isLoading} />
    </Modal>
  );
};

export default ForgotPasswordModal;
