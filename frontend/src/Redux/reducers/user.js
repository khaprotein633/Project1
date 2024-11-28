import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {


  loginUserRequest: (state) => {
    state.loading = true;
  },
  loginUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  loginUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  registerUserRequest: (state) => {
    state.loading = true;
  },
  registerUserSuccess: (state, action) => {
    state.success = true;
    state.loading = false;
    state.user = action.payload;
  },
  registerUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },


  logoutUserRequest: (state) => {
    state.loading = true;
  },
  logoutUserSuccess: (state, action) => {
    state.isAuthenticated = false;
    state.loading = false;
    state.user = null;
  },
  logoutUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
  },


  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});