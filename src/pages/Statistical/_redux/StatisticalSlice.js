import { createSlice } from "@reduxjs/toolkit";

const r_token =
    "hp2hWihWWhW2hATusXhhAThW2hpAhAihAshp2hAAhpAhAhhATusXshWWhpAhW2hAihAhhAphpAhWiusXshpWhp2hAphpWhAphApusXhhAAhAuhAphpphAshAAhAshAXhpphpWhpphpWhpphpWhpphpWhpphpWhpphpWhpphpWhpphpWhpphpWhpWhpihAXhAphpihAXhp2hAXhpWhuhhAihA2hAhhAihA2hAuhAshuhhTAhiihppussTusXpusssussXusXuhWAusXiusXs";

const initialState = {
    Permission: {},
    R_Token: window.r_token || r_token
};

export const StatisticalSlice = createSlice({
    name: "point",
    initialState,
    reducers: {
        setPermission: (state, action) => {
            return {
                ...state,
                Permission: action.payload,
            };
        },
    },
});

export const { setPermission } = StatisticalSlice.actions;

export default StatisticalSlice.reducer;