import {StyleProp, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import React, {useState} from 'react';
import {Colors} from '../../../constans/colors';
import IconSendMessage from '../../../../assets/icon_app/sendMessage.svg';
import {scaleSize} from '../../../utils/scaleSize';

type TInputMessageProps = {
  style?: StyleProp<any>;
};

const InputMessage = ({style}: TInputMessageProps) => {
  const [text, setText] = useState('');

  const sendMessage = (text: string) => {
    if (text.trim().length !== 0) {
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline={true}
        placeholder="Type a message..."
        placeholderTextColor={Colors.COLOR1}
      />
      <TouchableOpacity style={styles.icon} onPress={() => sendMessage(text)}>
        <IconSendMessage
          width={scaleSize(30)}
          height={scaleSize(30)}
          fill={text.trim().length === 0 ? Colors.COLOR1 : Colors.COLOR3}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputMessage;
