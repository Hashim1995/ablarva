import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents the assistant slice of the Redux store.
 * @remarks It contains the current assistant model, assistant language, reset assistant inner, waiting for response, and waiting for thread load states.
 * @see Assistant module
 * @example
 * // Get the current assistant model
 * const currentModel = useSelector((state: RootState) => state.assistant.currentModel);
 */
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
  // Reducers for setting the current assistant model, assistant language, reset assistant inner, waiting for response, and waiting for thread load states
  reducers: {
    /**
     * Sets the current assistant model.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setCurrentAssistantModel: (state, action: PayloadAction<any>) => {
      state.currentAssistantModel = action.payload;
    },

    /**
     * Sets the current assistant language.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setCurrentAssistantLanguage: (state, action: PayloadAction<any>) => {
      state.currentAssistantLanguage = action.payload;
    },

    /**
     * Sets the reset assistant inner (reset react component).
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setResetAssistantInner: (state, action: PayloadAction<any>) => {
      state.resetAssistantInner = action.payload;
    },

    /**
     * Sets the waiting for assistant response.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setWaitingForAssistantResponse: (state, action: PayloadAction<any>) => {
      state.waitingForAssistantResponse = action.payload;
    },

    /**
     * Sets the waiting for assistant thread load.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setWaitingForAssistantThreadLoad: (state, action: PayloadAction<any>) => {
      state.waitingForAssistantThreadLoad = action.payload;
    },

    /**
     * Sets the assistants drawer.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
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
