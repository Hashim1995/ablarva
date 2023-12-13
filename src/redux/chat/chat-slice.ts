import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentModel: '1',
    currentThreadId: null,
    resetChatInner: Date.now(),
    waitingForResponse: false
  },
  reducers: {
    setCurrentChatModel: (state, action: PayloadAction<any>) => {
      state.currentModel = action.payload;
    },
    setCurrentThreadId: (state, action: PayloadAction<any>) => {
      state.currentThreadId = action.payload;
    },
    setResetChatInner: (state, action: PayloadAction<any>) => {
      state.resetChatInner = action.payload;
    },
    setWaitingForResponse: (state, action: PayloadAction<any>) => {
      state.waitingForResponse = action.payload;
    }
  }
});

export const {
  setCurrentChatModel,
  setCurrentThreadId,
  setResetChatInner,
  setWaitingForResponse
} = chatSlice.actions;
export default chatSlice.reducer;
