import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    token: localStorage.getItem("token") || "",
    isAuthenticated:
      !!localStorage.getItem("token"),
  },

  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;