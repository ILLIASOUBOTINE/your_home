import {
  ActivityIndicator,
  Alert,
  StyleProp,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../../constans/colors';
import IconSendMessage from '../../../../assets/icon_app/sendMessage.svg';
import {scaleSize} from '../../../utils/scaleSize';
import {Message} from '../../../types/Message';
import {NameCollection} from '../../../constans/nameCollection';

type TInputMessageProps = {
  style?: StyleProp<any>;
  userId: string;
  scrollToEnd: () => void;
};

const InputMessage = ({style, userId, scrollToEnd}: TInputMessageProps) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createNewMessage = (text: string): Message => {
    return {text, date: new Date(), isAnswer: false};
  };

  const uploadMessageInFirestore = async (newMessage: Message) => {
    try {
      const uploadedMessageInFirestore = await firestore()
        .collection(NameCollection.USERS)
        .doc(userId)
        .collection(NameCollection.MESSAGES)
        .add(newMessage);
      return uploadedMessageInFirestore;
    } catch (error) {
      throw error;
    }
  };

  const sendMessage = async (text: string) => {
    if (text.trim().length !== 0) {
      setIsLoading(true);
      try {
        const newMessage = createNewMessage(text);
        await uploadMessageInFirestore(newMessage);
        setText('');
        scrollToEnd();
      } catch (error) {
        Alert.alert('Add Message', 'Message not added!');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
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
