import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "@/features/api/authApi";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loadUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
    );
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
