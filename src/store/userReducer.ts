import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
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
    // setUserIslogin: (state, action: PayloadAction<boolean>) => {
    //   state.isLogin = action.payload;
    // },
    // setUserId: state => {
    //   auth().onAuthStateChanged(user => {
    //     if (user) {
    //       console.log('ID', user.uid);
    //       state.id = user.uid;
    //     }
    //   });
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        console.log('PENDING');
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.payload;
        console.log('REJECTED');
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const userData = action.payload;
        // state.id = userData.id;
        state.firstName = userData.firstName;
        state.lastName = userData.lastName;
        state.phoneNumber = userData.phoneNumber;
        state.address = userData.address;
        state.email = userData.email;
        state.isLogin = true;
        console.log('REQUEST FINISHED FULLFILLED');
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
