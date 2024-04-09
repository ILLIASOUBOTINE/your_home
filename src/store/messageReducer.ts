import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import firestore from '@react-native-firebase/firestore';

import {NameCollection} from '../constans/nameCollection';
import {MessageForRedux, MessageFromFirestore} from '../types/Message';
import {messageFromFirestoreTOMessageForRedux} from '../utils/utilsMessage';

export interface MessagesState {
  messages: MessageForRedux[];
  error: any;
}

const initialState: MessagesState = {
  messages: [],
  error: null,
};

export const fetchMessagesByUserId = createAsyncThunk(
  'message/fetchMessagesByUserId',
  async (userId: string) => {
    const messagesDoc = await firestore()
      .collection(NameCollection.USERS)
      .doc(userId)
      .collection(NameCollection.MESSAGES)
      .get();

    const messagesData = messagesDoc.docs.map(doc => {
      const messageData = doc.data() as MessageFromFirestore;
      messageData.id = doc.id;

      return messageData;
    });
    const messagesDataRedux =
      messageFromFirestoreTOMessageForRedux(messagesData);
    return messagesDataRedux;
  },
);

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageForRedux[]>) => {
      state.messages = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMessagesByUserId.pending, (state, action) => {
        console.log('messagePENDING');
      })
      .addCase(fetchMessagesByUserId.rejected, (state, action) => {
        state.error = action.payload;
        console.log('messageREJECTED');
      })
      .addCase(fetchMessagesByUserId.fulfilled, (state, action) => {
        state.messages = action.payload;
        console.log('messageREQUEST FINISHED FULLFILLED');
      });
  },
});

export const {setMessages} = messageSlice.actions;

export default messageSlice.reducer;
