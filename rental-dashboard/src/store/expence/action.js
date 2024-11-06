import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getExpence = createAsyncThunk(
  "GET-EXPENCE",
  async (_, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/expences/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addExpence = createAsyncThunk(
  "ADD-EXPENCE",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const expenceState = getState().expenceReducer.data;

      const response = await axios.post(
        "http://localhost:5000/api/expences/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );

      return [...expenceState, { ...response.data }];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExpenceStatus = createAsyncThunk(
  "UPDATE-EXPENCE-STATUS",
  async (data, { rejectWithValue, getState }) => {
    console.log("🚀 ~ data:", data);
    try {
      const JwtToken = localStorage.getItem("token");
      const expenceState = getState().expenceReducer.data;

      const response = await axios.put(
        `http://localhost:5000/api/expences/${data.id}/status`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );
      const updatedData = response.data;

      const newData = expenceState.map((expence) => {
        return expence._id === data.id ? updatedData : expence;
      });

      return newData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExpenceDetails = createAsyncThunk(
  "UPDATE-EXPENCE-DETAILS",
  async (data, { rejectWithValue, getState }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const expenceState = getState().expenceReducer.data;

      const response = await axios.put(
        `http://localhost:5000/api/expences/${data.id}/details`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );

      const updatedData = expenceState.map((expence) => {
        if (expence._id === data.id) {
          return { ...response.data };
        }
        return expence;
      });

      return updatedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleSelectAction = (state, action) => {
  const findSelected = state.data.find((s) => s.id === action.payload.key);
  state.selected = findSelected;
};

export const handleClearSelectedAction = (state) => {
  state.selected = {};
};
