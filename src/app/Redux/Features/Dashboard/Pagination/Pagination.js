// redux/Pagination

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allData: [],      // Store all data in an array
  displayedData: [], // Store the data to be displayed based on the current page
  isLoading: false,
  error: null,
};

const PaginationSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      state.allData = action.payload;
    },
    setDisplayedData: (state, action) => {
      state.displayedData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetData: (state) => {
      state.allData = [];
      state.displayedData = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setAllData, setDisplayedData, setLoading, setError, resetData } = PaginationSlice.actions;

export const selectData = (state) => state.data;

export default PaginationSlice.reducer;
