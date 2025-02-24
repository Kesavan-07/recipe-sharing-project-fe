import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      return action.payload; // Replacing the state with the new user data
    },
    removeUser: () => {
      return []; // Resetting state to an empty array instead of null for consistency
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
