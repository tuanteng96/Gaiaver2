import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TeachingCrud from "./teachingCrud";

export const fetchLessons = createAsyncThunk(
    'teaching/list',
    async({ data, UserID }, { rejectWithValue }) => {
        try {
            const result = await TeachingCrud.getLessonTeaching(data, UserID);
            return result;
        } catch ({ response }) {
            return rejectWithValue(response.data.error);
        }
    });

const initialState = {
    Token:
        !process.env.NODE_ENV || process.env.NODE_ENV === "development" ?
        "" : window.Token,
    MachineCode: localStorage.getItem("_MachineCode") || "",
    MachineUser: (window.User && window.User.MachineKey) || "",
    loading: {
        fetchLessons: false
    },
    error: {
        fetchLessons: ""
    },
    Programs: {}
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
    extraReducers: {
        [fetchLessons.pending]: (state) => {
            state.loading.fetchLessons = true;
        },
        [fetchLessons.rejected]: (state, { payload }) => {
            state.loading.fetchLessons = false;
            state.error.fetchLessons = payload;
        },
        [fetchLessons.fulfilled]: (state, { payload }) => {
            state.loading.fetchLessons = false;
            state.Programs = payload;
        }
    }
});

export const { setMachine } = teachingSlice.actions;

export default teachingSlice.reducer;