import { createSlice } from "@reduxjs/toolkit";

const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklEIjoiMzM4IiwibmJmIjoxNjM3NDY5ODQ0LCJleHAiOjE2NjkwMDU4NDQsImlhdCI6MTYzNzQ2OTg0NH0.OprNY90PkBQB4yoRgOZ-sM8If89ATbTyhKyCikkjuW0";

const initialState = {
  Token:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? Token
      : window.Token,
  MachineCode: localStorage.getItem("_MachineCode") || "",
  MachineUser: (window.User && window.User.MachineKey) || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMachine: (state, action) => {
      localStorage.setItem("_MachineCode", action.payload);
      return {
        ...state,
        MachineCode: action.payload,
        MachineUser: action.payload,
      };
    },
  },
});

export const { setMachine } = authSlice.actions;

export default authSlice.reducer;
