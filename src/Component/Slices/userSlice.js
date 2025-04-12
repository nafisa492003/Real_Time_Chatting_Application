import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;

// ✅ Safe access only in browser
if (typeof window !== "undefined") {
  const userFromStorage = localStorage.getItem("user");
  storedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
}

const initialState = {
  user: storedUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;