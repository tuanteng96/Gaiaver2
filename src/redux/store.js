import { configureStore } from "@reduxjs/toolkit";
import teachingReducer from "../pages/Teaching/_redux/teachingSlice";

export const store = configureStore({
  reducer: {
    teaching: teachingReducer,
  },
});
