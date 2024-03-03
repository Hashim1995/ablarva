import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const assistanSlice = createSlice({
  name: 'assistan',
  initialState: {
    currentAssistanModel: '1',
    currentAssistanLanguage: '1',
    resetAssistanInner: Date.now(),
    waitingForAssistanResponse: false,
    waitingForAssistanThreadLoad: false
  },
  reducers: {
    setCurrentAssistanModel: (state, action: PayloadAction<any>) => {
      state.currentAssistanModel = action.payload;
    },
    setCurrentAssistanLanguage: (state, action: PayloadAction<any>) => {
      state.currentAssistanLanguage = action.payload;
    },

    setResetAssistanInner: (state, action: PayloadAction<any>) => {
      state.resetAssistanInner = action.payload;
    },
    setWaitingForAssistanResponse: (state, action: PayloadAction<any>) => {
      state.waitingForAssistanResponse = action.payload;
    },
    setWaitingForAssistanThreadLoad: (state, action: PayloadAction<any>) => {
      state.waitingForAssistanThreadLoad = action.payload;
    }
  }
});

export const {
  setCurrentAssistanModel,
  setCurrentAssistanLanguage,
  setResetAssistanInner,
  setWaitingForAssistanResponse,
  setWaitingForAssistanThreadLoad
} = assistanSlice.actions;
export default assistanSlice.reducer;
