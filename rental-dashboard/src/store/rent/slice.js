import { createSlice } from "@reduxjs/toolkit";
import { handleSelectAction, handleClearSelectedAction } from "./action";
import { addRent, getRent, getRentById } from "./action";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loadingAll: "idle",
  loading: "idle",
  error: undefined,
};

const rentReducer = createSlice({
  name: "rentReducer",
  initialState: initialState,
  reducers: {
    selectRent: handleSelectAction,
    clearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRent.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getRent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getRent.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getRentById.pending, (state) => {
        state.loading = "loading";
        state.error = undefined;
      })
      .addCase(getRentById.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = "succeeded";
      })
      .addCase(getRentById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(addRent.pending, (state) => {
        state.loading = "loading";
        state.error = undefined;
      })
      .addCase(addRent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "succeeded";
      })
      .addCase(addRent.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});


export const { handleSelect, handleClearSelected } = rentReducer.actions;

export const selectRent = (state) => state.rent;

export default rentReducer.reducer;