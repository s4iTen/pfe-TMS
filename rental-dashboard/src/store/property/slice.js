import { createSlice } from "@reduxjs/toolkit";
import { handleSelectAction, handleClearSelectedAction } from "./action";
import { addProperty, getProperty } from "./action";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loadingAll: "idle",
  loading: "idle",
  error: undefined,
};

const propertyReducer = createSlice({
  name: "propertyReducer",
  initialState: initialState,
  reducers: {
    selectUser: handleSelectAction,
    clearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProperty.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(addProperty.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
  },
});

export const { handleSelect, handleClearSelected } = propertyReducer.actions;

export const selectProperty = (state) => state.property;

export default propertyReducer.reducer;
