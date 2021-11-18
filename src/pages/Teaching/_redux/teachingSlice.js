import { createSlice } from "@reduxjs/toolkit";

const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklEIjoiMTk1IiwibmJmIjoxNjM3MTIxOTgxLCJleHAiOjE2Njg2NTc5ODEsImlhdCI6MTYzNzEyMTk4MX0.86hbR0mWk-7sdnkJjuWTF6kinSJZirbiqmQ2pePOwAg";

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
