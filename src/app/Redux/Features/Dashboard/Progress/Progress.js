import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import React from 'react';

const initialState = {
    progress: {
        open:false,
        value: 0
    }
};


const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action) => {
        state.progress.value = action.payload.value;
        state.progress.open = action.payload.open
      }
  },
});

export function handleProgressFunction(progress,dispatch){
    dispatch(setProgress({open:true,value:progress}))
    if(progress === 100){
      dispatch(setProgress({open:false,value:0}))
    }
}

export const { setProgress} = progressSlice.actions;

export const selectData = (state) => state.data;

export default progressSlice.reducer;
