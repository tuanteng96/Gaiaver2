import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Token:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? ""
      : window.Token,
  MachineCode: localStorage.getItem("_MachineCode") || "",
  MachineUser: (window.User && window.User.MachineKey) || "",
};

export const teachingSlice = createSlice({
  name: "teaching",
  initialState,
  reducers: {
    setMachine: (state, action) => {
      return {
        ...state,
      };
    },
  },
});

export const { setMachine } = teachingSlice.actions;

export default teachingSlice.reducer;
