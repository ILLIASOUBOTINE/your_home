import {StyleProp, Text, View} from 'react-native';
import {styles} from './style';
import React from 'react';
import {MessageForRedux} from '../../../types/Message';
import {dateFromReduxToTime} from '../../../utils/convertTask';

type TMessageItemProps = {
  message: MessageForRedux;
  userName: string;
  style?: StyleProp<any>;
};

const MessageItem = ({style, message, userName}: TMessageItemProps) => {
  return (
    <>
      {message.isAnswer ? (
        <View style={styles.container}>
          <View style={styles.containerAvatar}>
            <Text style={styles.avatar}>A</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.name}>Admin</Text>
            <Text style={styles.text}>{message.text}</Text>
            <Text style={styles.time}>{dateFromReduxToTime(message.date)}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={[styles.name, styles.textReverse]}>You</Text>
            <Text style={[styles.text, styles.textReverse]}>
              {message.text}
            </Text>
            <Text style={[styles.time, styles.textReverse]}>
              {dateFromReduxToTime(message.date)}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default MessageItem;
