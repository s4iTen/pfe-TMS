import { createSlice } from "@reduxjs/toolkit";
import { handleSelectAction, handleClearSelectedAction } from "./action";
import {
  addExpence,
  getExpence,
  updateExpenceDetails,
  updateExpenceStatus,
} from "./action";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loadingAll: "idle",
  loading: "idle",
  error: undefined,
};

const expenceReducer = createSlice({
  name: "expenceReducer",
  initialState: initialState,
  reducers: {
    selectExpence: handleSelectAction,
    clearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpence.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getExpence.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getExpence.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(addExpence.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(addExpence.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(addExpence.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updateExpenceDetails.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(updateExpenceDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(updateExpenceDetails.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updateExpenceStatus.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(updateExpenceStatus.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(updateExpenceStatus.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
  },
});

export const { handleSelect, handleClearSelected } = expenceReducer.actions;

export const selectExpence = (state) => state.expence;

export default expenceReducer.reducer;