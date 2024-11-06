import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProperty = createAsyncThunk(
  "GET-PROPERTY",
  async (_, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/properties/",
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

export const addProperty = createAsyncThunk(
  "ADD-PROPERTY",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const propertiesState = getState().propertyReducer.data;

      const response = await axios.post(
        "http://localhost:5000/api/properties/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );

      return [...propertiesState, { ...response.data }];
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
