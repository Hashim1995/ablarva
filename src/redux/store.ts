import { LayoutLanguage } from '@/models/common';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import statisticReducer from './statistics/statistics-slice';
import chatReducer from './chat/chat-slice';
import assistantReducer from './assistant/assistant-slice';
import coreReducer from './core/core-slice';

// Attempt to load the initial layout language from localStorage
const savedLayoutLanguage = localStorage.getItem('currentLayoutLanguage');
const initialLayoutLanguage = savedLayoutLanguage ? (savedLayoutLanguage as LayoutLanguage) : LayoutLanguage.Azerbaijani;

const preloadedState = {
  core: {
    currentLayoutLanguage: initialLayoutLanguage,
  }
  // Add other initial states if necessary
};


export const store = configureStore({
  reducer: {
    user: authReducer,
    statisticsCount: statisticReducer,
    chat: chatReducer,
    assistant: assistantReducer,
    core: coreReducer,
  },
  preloadedState
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
store.subscribe(() => {
  // Get the current state
  const state = store.getState();
  // Save the current layout language to localStorage
  localStorage.setItem('currentLayoutLanguage', state.core.currentLayoutLanguage);
});