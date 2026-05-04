import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import lookupReducer from './slices/lookupSlice';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    lookups: lookupReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
