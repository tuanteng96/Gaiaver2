import { createSlice } from "@reduxjs/toolkit";

const r_token =
  "Fz0EOaaFmEF07FmEFz0EOaOEOaFFzmF07FmaFmEFmKFzmFmFFz0FmEF00FzmFm5F07EOaOF05FzmFmFFmKFmEF05FmKFmmFz0FmEFmmFmzFm5FmFFzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFz0FzzFmKFz5Fz0Fz0Fz5FmaFz7FmaFmaFEFFmOFm7FmEFmKFm7FmOFz7FEFF7aF55FzzF00EOazF05EOa0F0mEOaaEOamEOaOEOa0F0mF00EOOOF0mF07F05EOOa";

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
