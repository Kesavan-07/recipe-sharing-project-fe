import React from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import RecipeDashboard from "./pages/user/RecipeDashboard";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/user/Profile";
import MyRecipes from "./pages/user/MyRecipes";
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
        path: "user", // ✅ Ensuring user routes are grouped properly
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
            path: "my-recipes",
            element: <MyRecipes />,
            loader: authLoader,
          },
        ],
      },
      {
        path: "recipe/:id",
        element: <RecipeDetail />,
      },
    ],
    hydrateFallbackElement: <Loader />,
  },
];

const router = createBrowserRouter(routes);

export default router;
