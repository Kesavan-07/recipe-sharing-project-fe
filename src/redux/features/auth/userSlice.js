import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../../../services/authServices";

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, thunkAPI) => {
    try {
      const response = await authServices.updateProfile(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    clearUser: (state) => {
      // Added clearUser action
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action) => {
      // Added setUser action
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Added selector for user state
export const selectUser = (state) => state.auth.user;

export const { logout, clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
