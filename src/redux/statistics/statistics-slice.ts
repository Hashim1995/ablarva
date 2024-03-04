import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const statisticsSlice = createSlice({
  name: 'statisticsCount',
  initialState: {
    statisticsCount: {
      isSuccess: true,
      data: {
        title: '',
        packageName: '',
        basic: {
          total: 0,
          usage: 0,
          remainder: 0
        },
        premium: {
          total: 0,
          usage: 0,
          remainder: 0
        },
        basicAssistant: {
          total: 0,
          usage: 0,
          remainder: 0
        },
        premiumAssistant: {
          total: 0,
          usage: 0,
          remainder: 0
        }
      },
      errors: null
    }
  },
  reducers: {
    setStatisticsCount: (state, action: PayloadAction<any>) => {
      state.statisticsCount = action.payload;
    }
  }
});

export const { setStatisticsCount } = statisticsSlice.actions;
export default statisticsSlice.reducer;
