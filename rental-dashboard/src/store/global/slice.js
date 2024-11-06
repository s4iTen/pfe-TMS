import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "",
  loadingAll: "idle",
  error: undefined,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setMode, setUserId } = globalSlice.actions;

export default globalSlice.reducer;
