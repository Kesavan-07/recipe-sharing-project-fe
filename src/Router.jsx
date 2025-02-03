import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import RecipeDashboard from "./pages/user/RecipeDashboard";
import RecipeDetail from "./pages/RecipeDetail"; // Import RecipeDetail
import Profile from "./pages/user/Profile";
import MyRecipes from "./pages/user/MyRecipes"; // MyRecipes for user's recipes
import CreateRecipe from "./pages/CreateRecipe"; // CreateRecipe import
import SearchPage from "./pages/SearchPage"; // ✅ Import SearchPage
import recipesLoader from "./loaders/unit/recipesLoader";
import authLoader from "./loaders/unit/authLoader";
import Loader from "./components/Loader";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: recipesLoader,
      },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      {
        path: "user", // Grouping user-related routes
        children: [
          {
            path: "dashboard",
            element: <RecipeDashboard />,
            loader: authLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            loader: authLoader,
          },
          {
            path: "recipes", // Path for My Recipes
            element: <MyRecipes />,
            loader: authLoader,
          },
        ],
      },
      {
        path: "recipe/:id", // Dynamic route for Recipe Details
        element: <RecipeDetail />, // Render RecipeDetail page
      },
      {
        path: "create-recipe", // Route for Create Recipe
        element: <CreateRecipe />,
        loader: authLoader, // Ensuring only authenticated users can access
      },
      {
        path: "search", // ✅ ADD THE SEARCH PAGE ROUTE
        element: <SearchPage />,
      },
    ],
    hydrateFallbackElement: <Loader />,
  },
];

const router = createBrowserRouter(routes);

export default router;
