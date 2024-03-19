import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  fistName: string;
  lastName: string;
  phoneNumber: string;
  adress: string;
  email: string;
  password: string;
  isLogin: boolean;
}

const initialState: UserState = {
  id: 0,
  fistName: '',
  lastName: '',
  phoneNumber: '',
  adress: '',
  email: '',
  password: '',
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserIslogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserIslogin} = userSlice.actions;

export default userSlice.reducer;