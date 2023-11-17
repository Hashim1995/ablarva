/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    gender: 0,
    dateOfBirth: ''
  },

  entities: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },

  }
});

// Action creators are generated for each case reducer function
export const { setUser, } = userSlice.actions;

export default userSlice.reducer;
