import React from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './style';

import Title1 from '../../ui/Title1/Title1';
import InputMessage from '../../general/InputMessage/InputMessage';
import MessageItem from '../../general/MessageItem/MessageItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import MessagesListener from '../../functional/MessagesListener';

const MessagesScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const messages = useSelector((state: RootState) => state.message.messages);

  return (
    <View style={styles.containerMain}>
      {user.id && <MessagesListener userId={user.id} />}
      <View style={styles.containerHeader}>
        <Title1>Messages</Title1>
      </View>
      <View style={styles.containerScroll}>
        {messages.length === 0 && (
          <Title1>You don`t have any chat messages yet!</Title1>
        )}
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <MessageItem message={item} userName={user.firstName} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.containerMessage}>
        <InputMessage userId={user.id!} />
      </View>
    </View>
  );
};

export default MessagesScreen;
