import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "@/api/authApi";


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


export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const token = localStorage.getItem("token");
  return token;
});


export const logoutUser = createAsyncThunk("auth/logout", async () => {
   localStorage.removeItem("token");
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

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
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
