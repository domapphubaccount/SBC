import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false
};


const chatInputSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    send_message: (state , action) => {
        state.loading = action.payload
    }
  },
});

export const { send_message} = chatInputSlice.actions;

export const selectData = (state) => state.data;

export default chatInputSlice.reducer;
