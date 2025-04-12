import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // ✅ no need to pull from localStorage manually
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // ✅ no need to setItem
    },
    logout: (state) => {
      state.user = null; // ✅ no need to removeItem
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
