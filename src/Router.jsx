import React from "react";
import { createBrowserRouter } from "react-router-dom"; // Fixed typo in `react-router-dom`
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import RecipeDashboard from "./pages/user/RecipeDashboard";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/user/Profile";
import MyRecipes from "./pages/user/MyRecipes";
import CreateRecipe from "./pages/CreateRecipe";
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
        path: "user", // ✅ Grouping user-related routes
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
            path: "recipes", // ✅ Fixed the path
            element: <MyRecipes />,
            loader: authLoader,
          },
        ],
      },
      {
        path: "recipe/:id",
        element: <RecipeDetail />,
      },
      {
        path: "create-recipe",
        element: <CreateRecipe />,
        loader: authLoader, // Ensuring only authenticated users can access
      },
    ],
    hydrateFallbackElement: <Loader />,
  },
];

const router = createBrowserRouter(routes);

export default router;
