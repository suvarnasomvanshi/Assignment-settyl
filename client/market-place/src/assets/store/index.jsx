import { configureStore, createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, userDetail : null },
  reducers: {
    login(state,action) {
      state.isLoggedIn = true;
      state.userDetail = action.payload.userDetail;
      console.log(state.userDetail)
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userDetail = null;
    }
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: {auth:authSlice.reducer,}
});

export default store;

