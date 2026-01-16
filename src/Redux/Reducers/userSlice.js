import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:5050";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/v1/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login Failed"
      );
    }
  }
);

export const loadUser = createAsyncThunk("user/loadUser", async (thunkAPI) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/user/loaduser`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || "Login Failed"
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuth: false,
    user: null,
    loaduser: null,
    error: null,
    message: null,
  },
  reducers: {
    logout(state) {
      (state.user = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        (state.loading = true),
          (state.isAuth = false),
          (state.user = null),
          (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuth = true),
          (state.user = action.payload),
          (state.error = null);
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false),
          (state.isAuth = false),
          (state.user = null),
          (state.error = action.payload);
        state.message = action.payload;
      })

      .addCase(loadUser.pending, (state) => {
        (state.loading = true),
          (state.isAuth = false),
          (state.user = null),
          (state.error = null);
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuth = true),
          (state.user = action.payload),
          (state.error = null);
      })
      .addCase(loadUser.rejected, (state, action) => {
        (state.loading = false),
          (state.isAuth = false),
          (state.user = null),
          (state.error = action.payload);
        state.message = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
