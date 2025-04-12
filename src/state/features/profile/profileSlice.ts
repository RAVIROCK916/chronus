import { IMAGE_PLACEHOLDER_URL } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    id: "",
    name: "John Doe",
    email: "john.doe@example.com",
    profile_picture: IMAGE_PLACEHOLDER_URL,
  },
  reducers: {
    setProfile: (state, action) => action.payload,
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAvatar: (state, action) => {
      state.profile_picture = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
