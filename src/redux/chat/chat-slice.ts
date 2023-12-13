import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentModel: '1',
    currentThreadId: null,
    resetChatInner: Date.now(),
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
    }
  }
});

export const { setCurrentChatModel, setCurrentThreadId, setResetChatInner } = chatSlice.actions;
export default chatSlice.reducer;
