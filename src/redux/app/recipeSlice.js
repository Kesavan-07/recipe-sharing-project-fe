import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    allrecipe: [],
    filter: "",
  },
  reducers: {
    addRecipe: (state, action) => {
      state.allrecipe.push(action.payload); // ✅ Correct mutation (Redux Toolkit handles immutability)
    },
    removeRecipe: (state, action) => {
      state.allrecipe = state.allrecipe.filter(
        (recipe) => recipe._id !== action.payload
      ); // ✅ Correctly updating `allrecipe`
    },
    searchRecipe: (state, action) => {
      state.filter = action.payload; // ✅ Correctly updating `filter`
    },
  },
});

export const { addRecipe, removeRecipe, searchRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
