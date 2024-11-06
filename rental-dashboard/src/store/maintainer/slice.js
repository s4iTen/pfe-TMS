import { createSlice } from "@reduxjs/toolkit";
import {
  handleSelectAction,
  handleClearSelectedAction,
  getMaintainer,
  getMaintainerById,
  addMaintainer,
  updateMaintainer,
  deleteMaintainer,
} from "./action";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loadingAll: "idle",
  loading: "idle",
  error: undefined,
};

const maintainerReducer = createSlice({
  name: "maintainerReducer",
  initialState: initialState,
  reducers: {
    selectUser: handleSelectAction,
    clearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaintainer.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getMaintainer.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getMaintainer.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(addMaintainer.pending, (state) => {
        state.loading = "loading";
        state.error = undefined;
      })
      .addCase(addMaintainer.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "succeeded";
      })
      .addCase(addMaintainer.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const { selectUser, clearSelected } = maintainerReducer.actions;

export const selectMaintainer = (state) => state.maintainer;

export default maintainerReducer.reducer;
