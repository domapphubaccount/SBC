import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

const isBrouse = typeof window !== "undefined"

// start login
export const loginAction = createAsyncThunk(
  "login/loginAction",
  async (arg, { rejectWithValue }) => {
    const { email, password } = arg;
    try {
      const response = await axios.post(
        `${config.api}login?email=${email}&password=${password}`,
        {
          email: email,
          password: password,
        }
      );

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end login

// start logout
export const logoutAction = createAsyncThunk(
  "login/logoutAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    console.log(token)
    try {
      const response = await axios.post(`${config.api}logout`,{}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,  
            Accept: "application/json",        
          },
        });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end logout

// start forget password
export const forgetPasswordAction = createAsyncThunk(
  "login/forgetPasswordAction",
  async (arg, { rejectWithValue }) => {
    const { email } = arg;
    try {
      const response = await axios.post(`${config.api}password/email`, {
        email: email,
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end forget password

// start check code
export const checkCodeAction = createAsyncThunk(
  "login/checkCodeAction",
  async (arg, { rejectWithValue }) => {
    const { code } = arg;
    try {
      const response = await axios.post(
        `${config.api}password/code/check?code=${code}`
      );

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end check code

// start check code
export const resetpasswordAction = createAsyncThunk(
  "login/resetpasswordAction",
  async (arg, { rejectWithValue }) => {
    const { code, password, confirmPassword } = arg;
    try {
      const response = await axios.post(
        `${config.api}password/reset?code=${code}&password=${password}&password_confirmation=${confirmPassword}`
      );

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end check code

// start register
export const registerAction = createAsyncThunk(
  "register/registerAction",
  async (arg, { rejectWithValue }) => {
    const { username, email, password, password_confirmation } = arg;
    try {
      const response = await axios.post(
        `${config.api}register?name=${username}&email=${email}&password=${password}&password_confirmation=${password_confirmation}`
      );

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end register

const initialState = {
  value: "",
  loading: false,
  auth: isBrouse && localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).access_token ? JSON.parse(localStorage.getItem('data'))  : null,
  logged: isBrouse && localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).access_token ? true : false,
  
  // start password
  password:{
    step: 1,
    loading: false,
    error: null,
  }
  // end password
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //start login
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.auth = action.payload.data;
        state.logged = true;

        if(isBrouse && action.payload.data){
          localStorage.setItem('data',JSON.stringify(action.payload.data))
        }
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end login

      // start logout
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = null;
        if(isBrouse){
          localStorage.clear();
        }
        state.logged = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end logout


      

      // start forget password
      .addCase(forgetPasswordAction.pending, (state) => {
        console.log('pending')
        state.password.loading = true;
        state.password.error = null;
      })
      .addCase(forgetPasswordAction.fulfilled, (state, action) => {
        console.log('full')
        state.password.loading = false;
        state.password.step = 2;
        state.password.error = null;

      })
      .addCase(forgetPasswordAction.rejected, (state, action) => {
        console.log('error')
        state.password.step = 2;
        state.password.loading = false;
        state.password.error = 'error';
      })
      // end forget password

      // start check code
      .addCase(checkCodeAction.pending, (state) => {
        state.password.loading = true;
        state.password.error = null;
      })
      .addCase(checkCodeAction.fulfilled, (state, action) => {
        state.password.step = 3;
        state.password.loading = false;
      })
      .addCase(checkCodeAction.rejected, (state, action) => {
        state.password.step = 3;
        state.password.loading = false;
        // state.error = action.payload;
      })
      // end check code

      // start reset password
      .addCase(resetpasswordAction.pending, (state) => {
        state.password.loading = true;
        state.password.error = null;
      })
      .addCase(resetpasswordAction.fulfilled, (state, action) => {
        state.password.loading = false;
      })
      .addCase(resetpasswordAction.rejected, (state, action) => {
        state.password.loading = false;
        state.password.error = 'error';
      })
      // end reset password




      // start register
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end register
  },
});

export default loginSlice.reducer