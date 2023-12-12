import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        currentModel: '1',
    },
    reducers: {
        setCurrentChatModel: (state, action: PayloadAction<any>) => {
            state.currentModel = action.payload;
        }
    }
});

export const { setCurrentChatModel } = chatSlice.actions;
export default chatSlice.reducer;
