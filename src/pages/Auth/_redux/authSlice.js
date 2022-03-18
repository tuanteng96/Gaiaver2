import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Token: window.Token,
    MachineCode: localStorage.getItem("_MachineCode") || "",
    MachineUser: (window.User && window.User.MachineKey) || "mj5WBF0JDwc4R9apHmya",
    Info: window.Info || { User: { ID: 3799 } }
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
        setToken: (state, action) => {
            return {
                ...state,
                Token: action.payload
            }
        }
    },
});

export const { setMachine, setToken } = authSlice.actions;

export default authSlice.reducer;