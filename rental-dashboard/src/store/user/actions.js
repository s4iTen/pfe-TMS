import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "GET-USER",
  async (_, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/users/", {
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
export const getSingleUser = createAsyncThunk(
  "GET-SINGLE-USER",
  async (userId, { rejectWithValue }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`,
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

export const addUser = createAsyncThunk(
  "ADD-USER",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const JwtToken = localStorage.getItem("token");
      const userState = getState().userReducer.data;

      const response = await axios.post(
        "http://localhost:5000/api/users/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JwtToken}`,
          },
        }
      );

      return [...userState, { ...response.data }];
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
