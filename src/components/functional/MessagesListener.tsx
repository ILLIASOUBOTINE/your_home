import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';

import {NameCollection} from '../../constans/nameCollection';
import {MessageFromFirestore} from '../../types/Message';
import {messageFromFirestoreTOMessageForRedux} from '../../utils/utilsMessage';
import {setMessages} from '../../store/messageReducer';

const MessagesListener = ({userId}: {userId: string}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(NameCollection.USERS)
      .doc(userId)
      .collection(NameCollection.MESSAGES)
      .onSnapshot(snapshot => {
        const messagesData = snapshot.docs.map(doc => {
          const messageData = doc.data() as MessageFromFirestore;
          messageData.id = doc.id;
          return messageData;
        });
        const messagesDataRedux =
          messageFromFirestoreTOMessageForRedux(messagesData);
        dispatch(setMessages(messagesDataRedux));
      });

    return () => unsubscribe(); // Отписываемся от подписки при размонтировании компонента
  }, [dispatch, userId]);

  return null; // Поскольку компонент используется только для управления подпиской, он не рендерит ничего
};

export default MessagesListener;
