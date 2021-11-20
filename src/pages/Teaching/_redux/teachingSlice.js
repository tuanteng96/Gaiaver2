import { createSlice } from "@reduxjs/toolkit";

const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklEIjoiMjc5IiwibmJmIjoxNjM3MjA5MTQ3LCJleHAiOjE2Njg3NDUxNDcsImlhdCI6MTYzNzIwOTE0N30.4RsTB0GRFhhRQ28ZUD0qf4fgAPWb5VslNzg6aj90bso";

const initialState = {
  Token:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? Token
      : window.Token,
  MachineCode: localStorage.getItem("_MachineCode") || "",
  MachineUser: (window.User && window.User.MachineKey) || "",
};

export const teachingSlice = createSlice({
  name: "counter",
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

export const { setMachine } = teachingSlice.actions;

export default teachingSlice.reducer;
