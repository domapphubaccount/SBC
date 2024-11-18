import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allData: [],
  displayedData: [],
  currentPage: 1,
  itemsPerPage: 10, // default items per page
  isLoading: false,
  error: null,
};


const PaginationSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      state.allData = action.payload;
      // Update displayedData when all data is set
      state.displayedData = state.allData.slice(0, 10); // Show first 10 items
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
      state.currentPage = 1; // Reset to first page
    },
    setPage: (state, action) => {
      const page = action.payload;
      state.currentPage = page;
      const startIndex = (page - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      state.displayedData = state.allData.slice(startIndex, endIndex);
    },
    removeData: (state, action) => {
      state.displayedData = [];
      state.allData = []
    }
    
  },
});

export const { setAllData, setDisplayedData, setLoading, setError, resetData, setPage, removeData } = PaginationSlice.actions;

export const selectData = (state) => state.data;

export default PaginationSlice.reducer;
