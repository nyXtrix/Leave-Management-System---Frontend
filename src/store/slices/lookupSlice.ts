import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { lookupService } from "@/services/lookup.service";

export interface LookupItem {
  label: string;
  value: string | number;
}

interface LookupDataState {
  data: LookupItem[];
  lastUpdated: number | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

interface LookupState {
  departments: LookupDataState;
  roles: LookupDataState;
  leaveTypes: LookupDataState;
  genders: LookupDataState;
}

const createInitialLookupState = (): LookupDataState => ({
  data: [],
  lastUpdated: null,
  status: "idle",
  error: null,
});

const initialState: LookupState = {
  departments: createInitialLookupState(),
  roles: createInitialLookupState(),
  leaveTypes: createInitialLookupState(),
  genders: createInitialLookupState(),
};

const TTL = 30 * 60 * 1000;

const isStale = (lastUpdated: number | null) => {
  if (!lastUpdated) return true;
  return Date.now() - lastUpdated > TTL;
};


export const fetchDepartments = createAsyncThunk(
  "lookups/fetchDepartments",
  async (_, { getState }) => {
    const { lookups } = (getState() as RootState);
    if (!isStale(lookups.departments.lastUpdated)) return lookups.departments.data;

    return await lookupService.getDepartments();
  }
);

export const fetchRoles = createAsyncThunk(
  "lookups/fetchRoles",
  async (_, { getState }) => {
    const { lookups } = (getState() as RootState);
    if (!isStale(lookups.roles.lastUpdated)) return lookups.roles.data;

    return await lookupService.getRoles();
  }
);

export const fetchLeaveTypes = createAsyncThunk(
  "lookups/fetchLeaveTypes",
  async (_, { getState }) => {
    const { lookups } = (getState() as RootState);
    if (!isStale(lookups.leaveTypes.lastUpdated)) return lookups.leaveTypes.data;

    return await lookupService.getLeaveTypes();
  }
);

export const fetchGenders = createAsyncThunk(
  "lookups/fetchGenders",
  async (_, { getState }) => {
    const { lookups } = (getState() as RootState);
    if (!isStale(lookups.genders.lastUpdated)) return lookups.genders.data;

    return await lookupService.getGenders();
  }
);

const lookupSlice = createSlice({
  name: "lookups",
  initialState,
  reducers: {
    clearLookups: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.departments.status = "loading";
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments.status = "success";
        state.departments.data = action.payload;
        state.departments.lastUpdated = Date.now();
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.departments.status = "error";
        state.departments.error = action.error.message || "Failed to fetch departments";
      });

    builder
      .addCase(fetchRoles.pending, (state) => {
        state.roles.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles.status = "success";
        state.roles.data = action.payload;
        state.roles.lastUpdated = Date.now();
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.roles.status = "error";
        state.roles.error = action.error.message || "Failed to fetch roles";
      });

      builder
      .addCase(fetchLeaveTypes.pending, (state) => {
        state.leaveTypes.status = "loading";
      })
      .addCase(fetchLeaveTypes.fulfilled, (state, action) => {
        state.leaveTypes.status = "success";
        state.leaveTypes.data = action.payload as LookupItem[];
        state.leaveTypes.lastUpdated = Date.now();
      })
      .addCase(fetchLeaveTypes.rejected, (state, action) => {
        state.leaveTypes.status = "error";
        state.leaveTypes.error = action.error.message || "Failed to fetch leave types";
      });

    builder
      .addCase(fetchGenders.pending, (state) => {
        state.genders.status = "loading";
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.genders.status = "success";
        state.genders.data = action.payload;
        state.genders.lastUpdated = Date.now();
      })
      .addCase(fetchGenders.rejected, (state, action) => {
        state.genders.status = "error";
        state.genders.error = action.error.message || "Failed to fetch genders";
      });
  },
});

export const { clearLookups } = lookupSlice.actions;
export default lookupSlice.reducer;
