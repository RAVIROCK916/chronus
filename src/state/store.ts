import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./features/profile/profileSlice";
import notificationReducer from "./features/notification/notificationSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
