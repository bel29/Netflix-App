import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import requests from "../common/Request";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const response = await axios.get(requests.requestPopular);
    return response.data.results;
  }
);

const initialState = {
  data: {},
  pending: false,
  error: "",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
  //TODO: remove console.logs
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      // console.log("Pendiente");
      return { ...state, pending: true };
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      // console.log("Fetched!");
      return { ...state, data: payload, pending: false };
    },
    [fetchAsyncMovies.rejected]: (state, { error }) => {
      // console.log("Rechazada!");
      return { ...state, error: error.message, pending: false };
    },
  },
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.data;
export const getMovies = (state) => state.movies;
export default movieSlice.reducer;
