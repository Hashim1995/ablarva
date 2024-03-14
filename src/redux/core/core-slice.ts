import { LayoutLanguage } from '@/models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * The coreSlice represents a slice of the Redux store for the 'core' module.
 * It contains the current layout language state.
 */
const coreSlice = createSlice({
  name: 'core',
  initialState: {
    currentLayoutLanguage: LayoutLanguage.Azerbaijani // Corrected the property name here
  },
  reducers: {
    setCurrentLayoutLanguage: (
      state,
      action: PayloadAction<LayoutLanguage>
    ) => {
      // Corrected the method name
      state.currentLayoutLanguage = action.payload;
    }
  }
});

export const {
  setCurrentLayoutLanguage // Corrected the export
} = coreSlice.actions;
export default coreSlice.reducer;
