import { createSlice } from "@reduxjs/toolkit";

const r_token = "YRVYR8YRdYZ8YRdYZPYRlYRlYVRYRDYZZDylyYRlYVRYRYYRdYVPDylyYVRYZ8DylyYRDYVPYVRYVPYVZYRdYZPYVPYVZYRYYVPYZPDylYDylYDylYYVVYRyYRRYRyYRlYVVYVZYVVYVZYVVYVZYVVYVZYVVYVZYVVYVZYVVYVZYVVYVZYVVYVZYVZYV8YRlYRlYV8YRlYVPYRlYVZYDYYRYYRPYRDYRVYRPYVPYRYYDYYPlY88YVVYZZDylVYZ8DylZYZRDyllDylRDylyDylZYZRYZZDyyyYZRYZPYZ8Dyyl"

const initialState = {
    Permission: {},
    R_Token: window.r_token || r_token
};

export const pointsSlice = createSlice({
    name: "teaching",
    initialState,
    reducers: {
        setPermission: (state, action) => {
            return {
                ...state,
                Permission: action.payload
            };
        },
    },
});

export const { setPermission } = pointsSlice.actions;

export default pointsSlice.reducer;