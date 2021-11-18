import { createSlice } from "@reduxjs/toolkit";

const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklEIjoiMjczIiwibmJmIjoxNjM3MjA2MzcyLCJleHAiOjE2Njg3NDIzNzIsImlhdCI6MTYzNzIwNjM3Mn0.BrbVYxayo5NONwkk6gDW44ohKIR__HDQqMBcqUHwAQ0";

const initialState = {
  Token:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? Token
      : window.Token,
  MachineCode: localStorage.getItem("_MachineCode") || "",
  MachineUser:
    (window.User && window.User.MachineKey) || "TnQ4j2okdLTaauoEKQFk",
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
