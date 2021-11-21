import { configureStore } from "@reduxjs/toolkit";
import teachingReducer from "../pages/Teaching/_redux/teachingSlice";
import authReducer from "../pages/Auth/_redux/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teaching: teachingReducer,
  },
});
