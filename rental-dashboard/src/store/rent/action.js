import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRent = createAsyncThunk(
  "GET-RENT",
  async (_, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/rents/", {
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

export const addRent = createAsyncThunk(
  "ADD-RENT",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const rentState = getState().rentReducer.data;

      const response = await axios.post(
        "http://localhost:5000/api/rents/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );

      return [...rentState, { ...response.data }];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRentById = createAsyncThunk(
  "GET-RENTBYID",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/rents/${id}`,
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

export const handleSelectAction = (state, action) => {
  const findSelected = state.data.find((s) => s.id === action.payload.key);
  state.selected = findSelected;
};

export const handleClearSelectedAction = (state) => {
  state.selected = {};
};