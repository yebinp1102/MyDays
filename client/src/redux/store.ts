import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.ts';
import postReducer from './slices/postSlice.ts';
import profileReducer from './slices/profileSlice.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    profile: profileReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch