import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { notificationService, type Notification } from "@/services/notification.service";

interface NotificationState {
  items: Notification[];
  unreadCount: number;
  isLoading: boolean;
}

const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
  isLoading: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async () => notificationService.getNotifications()
);

export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async () => notificationService.getUnreadCount()
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string) => {
    await notificationService.markAsRead(id);
    return id;
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async () => notificationService.markAllAsRead()
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addLiveNotification(state, action: PayloadAction<Notification>) {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload.count;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const n = state.items.find((i) => i.externalId === action.payload);
        if (n && !n.isRead) {
          n.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.items.forEach((n) => (n.isRead = true));
        state.unreadCount = 0;
      });
  },
});

export const { addLiveNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
