import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allData: [],
  displayedData: [],
  currentPage: 1,
  itemsPerPage: 10,

};


const PaginationSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      state.allData = action.payload;
      state.displayedData = state.allData.slice(0, 10); 
    },
    setDisplayedData: (state, action) => {
      state.displayedData = action.payload;
    },
    resetData: (state) => {
      state.allData = [];
      state.displayedData = [];
      state.currentPage = 1;
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

export const { setAllData, setDisplayedData, resetData, setPage, removeData } = PaginationSlice.actions;

export const selectData = (state) => state.data;

export default PaginationSlice.reducer;
