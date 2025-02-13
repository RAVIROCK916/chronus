import { IMAGE_PLACEHOLDER_URL } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: null,
    email: null,
    avatar: IMAGE_PLACEHOLDER_URL,
  },
  reducers: {
    setProfile: (state, action) => {
      state = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
