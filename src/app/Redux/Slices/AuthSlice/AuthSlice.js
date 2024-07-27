"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let isBrouse = typeof window !== "undefined"


// start login action
export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (arg, thunkAPI) => {
    try {
      const response = await axios.post(`https://sbc.designal.cc/api/login`, {
        email: arg.email,
        password: arg.password,
      });

      if(response.data.message === "Success"){
      return response.data;
      }else{
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// end login action


// start signup action
export const signupAction = createAsyncThunk(
    "auth/signupAction",
    async (arg, thunkAPI) => {
      try {
        const response = await axios.post(`https://sbc.designal.cc/api/user-create`, {
          name: arg.name,
          email: arg.email,
          password: arg.password,
        });
  
        if(response.data.message === "Success"){
        return response.data;
        }else{
          return thunkAPI.rejectWithValue(response.data.message);
        }
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );
// end signup action



const initialState = {
  loading: false,
  error: '',
  data:  isBrouse && localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')) || {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // start login
    builder
      .addCase(loginAction.pending, (state) => {

        state.loading = true;
        
        console.log('pending');
      
      })
      .addCase(loginAction.fulfilled, (state, action) => {

        state.loading = false;
        state.data = action.payload.data;
        localStorage.setItem("data" , JSON.stringify(action.payload.data));
        window.next.router.push("/");

        console.log('success');
      })
      .addCase(loginAction.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload;
        
        console.log('rejected');
      
       })
    //   end login

    // start signup

        .addCase(signupAction.pending, (state) => {
  
          state.loading = true;
          
          console.log('pending');
        
        })
        .addCase(signupAction.fulfilled, (state, action) => {
  
          state.loading = false;
          state.data = action.payload.data;
          localStorage.setItem("data" , JSON.stringify(action.payload.data));
  
          console.log('success');
        })
        .addCase(signupAction.rejected, (state, action) => {
  
          state.loading = false;
          state.error = action.payload;
          
          console.log('rejected');
        
         });
    //   end signup
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
