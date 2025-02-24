import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register , login , getStarted } from "~/api/auth.api";
import { RegisterType } from "~/types/types";

interface AuthState {
  user: any; 
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};



export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterType, { rejectWithValue }) => {
    try {
      const response = await register(userData)
      return response.user;

    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await login(credentials)

      return response.token;

    } catch (error:any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


export const getstarted = createAsyncThunk(
  "auth/start",
  async (credentials: { id: string; image: string, phoneNumber: string }, { rejectWithValue }) => {
    try {
      const response = await getStarted(credentials)
      return response.user;
    } catch (error:any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
});



export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("token");
  return null; 
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        AsyncStorage.setItem( 'userid' , action.payload.user._id)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        AsyncStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(getstarted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getstarted.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getstarted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      
      // check token
      .addCase(checkAuth.fulfilled, (state , action) => {
        state.token = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
