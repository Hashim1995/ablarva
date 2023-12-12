/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '@/services/auth-services/auth-services';
import { IUserData } from '@/models/user';

// Define the initial state of the user slice

interface AuthSliceInitalState {
  status: string;
  error: unknown;
  user: IUserData;
}

const initialState: AuthSliceInitalState = {
  user: {
    email: '',
    accessToken: '',
    firstName: '',
    lastName: '',
    currentSubscription: null,
    id: 0,
    gender: 0,
    dateOfBirth: '',
    verified: false,
    userSessions: []
  },
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    try {
      const response = await AuthService.getInstance().getMe();
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
    // You can add more reducers here if needed
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state: any, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error; // Use action.error to get the thrown error
      });

    // You can handle more actions here if needed
  }
});

// Export the reducer and actions
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
