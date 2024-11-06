import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTotalProperty = createAsyncThunk(
  "GET-TOTAL-PROPERTY",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/totalProperties/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getTotalIncomes = createAsyncThunk(
  "GET-TOTAL-INCOMES",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/totalIncomes/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getTotalExpenses = createAsyncThunk(
  "GET-TOTAL-EXPENSES",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/totalExpenses/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getPaymentHistory = createAsyncThunk(
  "GET-PAYMENT-HISTORY",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/payment-history/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMaintenanceStatus = createAsyncThunk(
  "GET-MAINTENANCE-STATUS",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/maintenance-status/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
