import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecipeDashboard from "./pages/user/RecipeDashboard";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/user/Profile";
import MyRecipes from "./pages/user/MyRecipes"; // MyRecipes for user's recipes
import Loader from "./components/Loader";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        // loader: recipesLoader,
      },
      { path: "login", element: <Login /> },
      {
        path: "user", // Grouping user-related routes
        children: [
          {
            path: "dashboard",
            element: <RecipeDashboard />,
            // loader: authLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            // loader: authLoader,
          },
          {
            path: "recipes", // Path for My Recipes
            element: <MyRecipes />,
            // loader: authLoader,
          },
        ],
      },
      {
        path: "recipes/:id", // Dynamic route for Recipe Details
        element: <RecipeDetail />, // Render RecipeDetail page
      },
    ],
    hydrateFallbackElement: <Loader />,
  },
];

const router = createBrowserRouter(routes);

export default router;
