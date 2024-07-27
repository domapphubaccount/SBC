"use client"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// start history action
export const codeAction = createAsyncThunk(
  "code/codeAction",
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.AuthSlice.data.token;

    try {
      const response = await axios.get(`https://sbc.designal.cc/api/sections` ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data.success){
      return response.data;
      }else{
          return thunkAPI.rejectWithValue(response.message);
        }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// end history action

const initialState = {
  loading: false,
  error: '',
  data: {},
  chosen: [],
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    choseCode: (state , action) => {

        if (!state.chosen.includes(action.payload)) {
            // Remove the item if it's already selected

            return ({
                ...state,
                chosen: [...state.chosen,action.payload]
            })
            
          } else {
            // Add the item if it's not already selected
            return ({
                ...state,
                chosen: state.chosen.filter(item => item !== action.payload)
            })
          }
        },
        choseAllCode: (state , action) => {
            if(action.payload){
                return ({
                    ...state,
                    chosen: state.data[0].pdfs.map(item => item.id)
                })
            }else{
                return ({
                    ...state,
                    chosen: []
                })
            }
        }
  },
  extraReducers: (builder) => {

    // start history
    builder
      .addCase(codeAction.pending, (state) => {

        state.loading = true;
        
        console.log('pending');
      
      })
      .addCase(codeAction.fulfilled, (state, action) => {

        state.loading = false;
        state.data = action.payload.data;

        console.log('success');
      })
      .addCase(codeAction.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload;
        
        console.log('rejected' , action);
      
       })
    //   end history
  },
});

export default codeSlice.reducer;
export const { codeActions , choseCode , choseAllCode } = codeSlice.actions;
