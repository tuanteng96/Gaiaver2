import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Token:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? localStorage.getItem("Token")
      : window.Token,
  MachineCode: localStorage.getItem("_MachineCode") || "",
};

export const teachingSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setMachine: (state, action) => {
      localStorage.setItem("_MachineCode", action.payload);
      return { ...state, MachineCode: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMachine } = teachingSlice.actions;

export default teachingSlice.reducer;
