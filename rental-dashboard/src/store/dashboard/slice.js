import { createSlice } from "@reduxjs/toolkit";
import {
  getMaintenanceStatus,
  getPaymentHistory,
  getTotalExpenses,
  getTotalIncomes,
  getTotalProperty,
} from "./action";

const initialState = {
  properties: [],
  expence: [],
  income: [],
  payment: {},
  maintanance: {},
  filteredData: [],
  selected: {},
  loadingAll: "idle",
  loading: "idle",
  error: undefined,
};

const dashboardReducer = createSlice({
  name: "dashboardReducer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalProperty.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getTotalProperty.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getTotalProperty.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getTotalExpenses.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getTotalExpenses.fulfilled, (state, action) => {
        state.expence = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getTotalExpenses.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getTotalIncomes.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getTotalIncomes.fulfilled, (state, action) => {
        state.income = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getTotalIncomes.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getPaymentHistory.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getPaymentHistory.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getPaymentHistory.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getMaintenanceStatus.pending, (state) => {
        state.loadingAll = "loading";
        state.error = undefined;
      })
      .addCase(getMaintenanceStatus.fulfilled, (state, action) => {
        state.maintanance = action.payload;
        state.loadingAll = "succeeded";
      })
      .addCase(getMaintenanceStatus.rejected, (state, action) => {
        state.loadingAll = "failed";
        state.error = action.payload;
      });
  },
});

export const { handleSelect, handleClearSelected } = dashboardReducer.actions;

export const selectExpence = (state) => state.expence;

export default dashboardReducer.reducer;
