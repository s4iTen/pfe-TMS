import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMaintainer = createAsyncThunk(
  "GET-MAINTAINER",
  async (_, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/maintainers/",
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

export const addMaintainer = createAsyncThunk(
  "ADD-MAINTAINER",
  async (postData, { rejectWithValue, getState }) => {
    console.log(postData);

    try {
      const JwtToken = localStorage.getItem("token");
      const maintainerState = getState().maintainerReducer.data;

      const response = await axios.post(
        "http://localhost:5000/api/maintainers/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );

      return [...maintainerState, { ...response.data }];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMaintainerById = createAsyncThunk(
  "GET-MAINTAINERBYID",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/maintainers/${id}`,
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

export const updateMaintainer = createAsyncThunk(
  "UPDATE-MAINTAINER",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const maintainerState = getState().maintainerReducer.data;

      const response = await axios.put(
        `http://localhost:5000/api/maintainers/${postData.id}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );

      const index = maintainerState.findIndex(
        (item) => item.id === postData.id
      );
      maintainerState[index] = response.data;

      return maintainerState;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMaintainer = createAsyncThunk(
  "DELETE-MAINTAINER",
  async (id, { rejectWithValue, getState }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const maintainerState = getState().maintainerReducer.data;

      await axios.delete(`http://localhost:5000/api/maintainers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JwtToken}`,
        },
      });

      return maintainerState.filter((item) => item.id !== id);
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
