import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import firestore from '@react-native-firebase/firestore';
import User from '../types/User';

export interface UserState {
  id: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  isLogin: boolean;
  error: any;
}

const initialState: UserState = {
  id: null,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  email: '',
  isLogin: false,
  error: null,
};

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: string) => {
    const userDoc = await firestore().collection('Users').doc(userId).get();
    const userData = userDoc.data() as User;
    userData['id'] = userId;
    return userData;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIslogin: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        return initialState;
      }
      state.isLogin = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUpdateUserFields: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string;
      }>,
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        console.log('UserPENDING');
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.payload;
        console.log('UserREJECTED');
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const userData = action.payload;
        state.id = userData.id;
        state.firstName = userData.firstName;
        state.lastName = userData.lastName;
        state.phoneNumber = userData.phoneNumber;
        state.address = userData.address;
        state.email = userData.email;
        // state.isLogin = true;
        console.log('UserREQUEST FINISHED FULLFILLED');
      });
  },
});

// Action creators are generated for each case reducer function
export const {setIslogin, setUserId, setUpdateUserFields} = userSlice.actions;

export default userSlice.reducer;
