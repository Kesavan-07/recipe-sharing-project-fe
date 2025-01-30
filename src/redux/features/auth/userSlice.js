import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../../../services/authServices";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await authServices.login(userData);
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// ✅ Async thunk for updating user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, thunkAPI) => {
    try {
      const response = await authServices.updateProfile(userData);
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Profile update failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    email: "",
    password: "",
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.email = "";
      state.password = "";
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
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
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload; // ✅ Update user data in Redux store
      });
  },
});

// ✅ Export all actions
export const { logout, setUser, clearUser, setEmail, setPassword } =
  userSlice.actions;
export default userSlice.reducer;

// ✅ Export selector functions
export const selectUser = (state) => state.user.user;
export const selectEmail = (state) => state.user.email;
export const selectPassword = (state) => state.user.password;
