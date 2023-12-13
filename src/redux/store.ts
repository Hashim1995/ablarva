import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import statisticReducer from './statistics/statistics-slice';
import chatReducer from './chat/chat-slice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    statisticsCount: statisticReducer,
    chat: chatReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
