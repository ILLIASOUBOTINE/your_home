import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1/Title1';
import InputMessage from '../../general/InputMessage/InputMessage';

const MessagesScreen = () => {
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerHeader}>
        <Title1>Messages</Title1>
      </View>
      <View style={styles.containerScroll}>
        <Text>trtr</Text>
      </View>
      <View style={styles.containerMessage}>
        <InputMessage />
      </View>
    </View>
  );
};

export default MessagesScreen;
