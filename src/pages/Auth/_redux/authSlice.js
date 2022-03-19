import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Token: window.Token,
    MachineCode: localStorage.getItem("_MachineCode") || "",
    MachineUser: (window.User && window.User.MachineKey) || "",
    Info: window.Info
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
        },
        setUserInfo: (state, action) => {
            return {
                ...state,
                Info: action.payload
            }
        },
        setMachineUser: (state, action) => {
            return {
                ...state,
                MachineUser: action.payload
            }
        }
    },
});

export const { setMachine, setToken, setUserInfo, setMachineUser } = authSlice.actions;

export default authSlice.reducer;