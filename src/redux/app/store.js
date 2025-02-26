import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recipeReducer from "./recipeSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
  },
});

export default store;
