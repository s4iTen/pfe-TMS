import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  addUser,
  handleSelectAction,
  handleClearSelectedAction,
  getSingleUser,
} from "./actions";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loadingAll: "idle",
  loading: "idle",
  error: undefined,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    selectUser: handleSelectAction,
    clearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(addUser.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
  },
});

export const { handleSelect, handleClearSelected } = userReducer.actions;

export const selectUser = (state) => state.user;

export default userReducer.reducer;
