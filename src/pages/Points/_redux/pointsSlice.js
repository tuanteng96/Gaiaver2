import { createSlice } from "@reduxjs/toolkit";

const r_token =
  "FmaEOaOFmKF07FmaEOaFFmEFmFFzmFmKFmmF05FmzFzmFmFFz0Fm5FmEFzmFmKFmFFmmFmmFzmEOaFF00F07FmOFmFEOaOEOaaEOaOFmEFm5Fm5FmEFzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0Fz0Fz5FmFFz5FmaFz7FmaFmaFEFFz0Fz7Fm7FmEFmOFm7FmOFm5FEFF7aF55FzzF00EOazF05EOa0F0mEOaaEOamEOaOEOa0F0mF00EOOOF0mF07F05EOOa";

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
        LoadingBtn: { ...state.LoadingBtn, ...action.payload },
      };
    },
  },
});

export const { setPermission, setLoadingBtn } = pointsSlice.actions;

export default pointsSlice.reducer;
