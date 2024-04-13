import {ActivityIndicator, Modal, StyleProp} from 'react-native';
import {styles} from './style';
import React from 'react';
import {Colors} from '../../../constans/colors';

type TLoadingModal = {
  style?: StyleProp<any>;
  isLoading: boolean;
};

const LoadingModal = ({style, isLoading = false}: TLoadingModal) => {
  return (
    <Modal transparent={true} visible={isLoading}>
      <ActivityIndicator
        style={styles.modal}
        size={'large'}
        color={Colors.COLOR4}
      />
    </Modal>
  );
};

export default LoadingModal;
