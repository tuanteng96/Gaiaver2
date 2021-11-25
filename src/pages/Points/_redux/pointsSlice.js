import { createSlice } from "@reduxjs/toolkit";

const r_token =
    "hAAusXhhWiusXXhAhhAshpWhpWhpAhp2hAhhAphAuhpAhAhhAihAhhpWhpAhAihpWhWihAshpAhAshAThp2usXXhAXhp2hAXusXhhAhhW2hAphAihpphAshAAhAshAXhpphpWhpphpWhpphpWhpphpWhpphpWhpphpWhpphpWhpphpWhpphpWhpWhpihAXhAhhpihAXhp2hAXhpWhuhhAThA2hpWhAphA2hAXhAshuhhTAhiihpphWWusXphWiusXWhWAusXXusXAusXsusXWhWAhWWussshWAhW2hWiussX";

const initialState = {
    Permission: {},
    R_Token: window.r_token || r_token,
    LoadingBtn: {
        Point1: false,
        Point2: false,
        Comment: false,
        Checked: {},
    },
};

export const pointsSlice = createSlice({
    name: "point",
    initialState,
    reducers: {
        setPermission: (state, action) => {
            return {
                ...state,
                Permission: action.payload,
            };
        },
        setLoadingBtn: (state, action) => {
            return {
                ...state,
                LoadingBtn: {...state.LoadingBtn, ...action.payload },
            };
        },
    },
});

export const { setPermission, setLoadingBtn } = pointsSlice.actions;

export default pointsSlice.reducer;