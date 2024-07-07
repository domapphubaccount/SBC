import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    status: '',
    id: '',
    conversation: {}
}

const fetchChat = createAsyncThunk('chat/fetchChat', ()=>{
    axios.get(`https://sbc.designal.cc/api/get-chat/${JSON.parse(localStorage.getItem("chat"))}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          chat_id: catchChat,
          share_name: "1"
      }
      })
      .then(response => {
        if(response.data.success){
        //   dispatch(getConversation(response.data.data[0]))
        //   dispatch(getChatData(response.data.data[0].user_chats))
          return response.data.data[0]
        }else{
            throw Error
        }
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      })
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,

    extraReducers: (builder)=>{
        builder
      .addCase(fetchChat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversation = action.payload;
        // state.chatData = action.payload.user_chats;
      })
      .addCase(fetchChat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

    }
})

// export const { fetchChat } = chatSlice.actions

export default chatSlice.reducer