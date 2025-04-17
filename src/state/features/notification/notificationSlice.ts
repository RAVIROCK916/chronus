import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    currentNotification: null,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setCurrentNotification: (state, action) => {
      state.currentNotification = action.payload;
    },
  },
});

export const { setNotifications, setCurrentNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
