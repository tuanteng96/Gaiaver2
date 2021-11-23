import { createSlice } from "@reduxjs/toolkit";

const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklEIjoiNDE5IiwibmJmIjoxNjM3NjU1MzM4LCJleHAiOjE2NjkxOTEzMzgsImlhdCI6MTYzNzY1NTMzOH0.LrnKLEFqREnvhTTlrVH-0eI-bbWKxNvGtVY7N4m2iAM";

const initialState = {
    Token:
        !process.env.NODE_ENV || process.env.NODE_ENV === "development" ?
        Token : window.Token,
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