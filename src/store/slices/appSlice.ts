import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AppStatus = "INITIALIZING" | "READY" | "FAILED";

interface AppState {
  status: AppStatus;
  initializationError: string | null;
}

const initialState: AppState = {
  status: "INITIALIZING",
  initializationError: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<AppStatus>) => {
      state.status = action.payload;
      if (action.payload === "READY") {
        state.initializationError = null;
      }
    },
    setInitializationError: (state, action: PayloadAction<string | null>) => {
      state.initializationError = action.payload;
      state.status = action.payload ? "FAILED" : "INITIALIZING";
    },
  },
});

export const { setAppStatus, setInitializationError } = appSlice.actions;
export default appSlice.reducer;
