import React from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import authLoader from "./loaders/unit/authLoader";
import Logout from "./components/Logout";
import RecipeDashboard from "./pages/user/RecipeDashboard";
import recipesLoader from "./loaders/unit/recipesLoader";
import recipeLoader from "./loaders/unit/recipeLoader";
import UserLayout from "./layouts/UserLayout";
import Profile from "./pages/user/Profile"; 
import MyRecipes from "./pages/user/MyRecipes"; 
import Loader from "./components/Loader";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      {
        path: "user",
        element: <UserLayout />,
        loader: authLoader,
        children: [
          {
            path: "dashboard",
            element: <RecipeDashboard />,
            loader: recipesLoader,
          },
          {
            path: "profile", // ✅ Added Profile Route
            element: <Profile />,
          },
          {
            path: "recipes", // ✅ Added My Recipes Route
            element: <MyRecipes />,
          },
          {
            path: "recipes/:id",
            element: <RecipeDashboard />,
            loader: recipeLoader,
          },
        ],
      },
    ],
    hydrateFallbackElement: <Loader />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
