import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents the chat slice of the Redux store.
 * @remarks It contains the current chat model, chat language, reset chat inner, waiting for response, and waiting for thread load states.
 * @see Chat module
 * @example
 * // Get the current chat model
 * const currentModel = useSelector((state: RootState) => state.chat.currentModel);
 */
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
    /**
     * Sets the current chat model.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setCurrentChatModel: (state, action: PayloadAction<any>) => {
      state.currentModel = action.payload;
    },

    /**
     * Sets the current chat language.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setCurrentChatLanguage: (state, action: PayloadAction<any>) => {
      state.currentChatLanguage = action.payload;
    },

    /**
     * Sets the reset chat inner value (reset react component).
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setResetChatInner: (state, action: PayloadAction<any>) => {
      state.resetChatInner = action.payload;
    },

    /**
     * Sets the waiting for response flag.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
    setWaitingForResponse: (state, action: PayloadAction<any>) => {
      state.waitingForResponse = action.payload;
    },

    /**
     * Sets the waiting for thread load flag.
     * @param state - The current state.
     * @param action - The action containing the payload.
     */
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
