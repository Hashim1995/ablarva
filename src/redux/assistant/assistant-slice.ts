import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const assistantSlice = createSlice({
  name: 'assistant',
  initialState: {
    currentAssistantModel: null,
    currentAssistantLanguage: '1',
    resetAssistantInner: Date.now(),
    waitingForAssistantResponse: false,
    waitingForAssistantThreadLoad: false,
    assistantsDrawer: true
  },
  reducers: {
    setCurrentAssistantModel: (state, action: PayloadAction<any>) => {
      state.currentAssistantModel = action.payload;
    },
    setCurrentAssistantLanguage: (state, action: PayloadAction<any>) => {
      state.currentAssistantLanguage = action.payload;
    },

    setResetAssistantInner: (state, action: PayloadAction<any>) => {
      state.resetAssistantInner = action.payload;
    },
    setWaitingForAssistantResponse: (state, action: PayloadAction<any>) => {
      state.waitingForAssistantResponse = action.payload;
    },
    setWaitingForAssistantThreadLoad: (state, action: PayloadAction<any>) => {
      state.waitingForAssistantThreadLoad = action.payload;
    },
    setAssistantsDrawer: (state, action: PayloadAction<any>) => {
      state.assistantsDrawer = action.payload;
    }
  }
});

export const {
  setCurrentAssistantModel,
  setCurrentAssistantLanguage,
  setResetAssistantInner,
  setWaitingForAssistantResponse,
  setWaitingForAssistantThreadLoad,
  setAssistantsDrawer
} = assistantSlice.actions;
export default assistantSlice.reducer;
