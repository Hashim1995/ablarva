import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentModel: '1',
    currentChatLanguage: '1',
    resetChatInner: Date.now(),
    waitingForResponse: false,
    waitingForThreadLoad: false
  },
  reducers: {
    setCurrentChatModel: (state, action: PayloadAction<any>) => {
      state.currentModel = action.payload;
    },
    setCurrentChatLanguage: (state, action: PayloadAction<any>) => {
      state.currentChatLanguage = action.payload;
    },

    setResetChatInner: (state, action: PayloadAction<any>) => {
      state.resetChatInner = action.payload;
    },
    setWaitingForResponse: (state, action: PayloadAction<any>) => {
      state.waitingForResponse = action.payload;
    },
    setWaitingForThreadLoad: (state, action: PayloadAction<any>) => {
      state.waitingForThreadLoad = action.payload;
    }
  }
});

export const {
  setCurrentChatModel,
  setCurrentChatLanguage,
  setResetChatInner,
  setWaitingForResponse,
  setWaitingForThreadLoad
} = chatSlice.actions;
export default chatSlice.reducer;
