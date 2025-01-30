import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import RecipeDashboard from "./pages/user/RecipeDashboard"; // ✅ Recipe creation page
import RecipeDetail from "./pages/RecipeDetail"; // ✅ Recipe details page
import recipesLoader from "./loaders/unit/recipesLoader";
import authLoader from "./loaders/unit/authLoader";
import Loader from "./components/Loader";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home />, loader: recipesLoader }, // ✅ Home (Public)
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      {
        path: "dashboard",
        element: <RecipeDashboard />,
        loader: authLoader, // ✅ Protected: Only for logged-in users
      },
      {
        path: "recipe/:id", // ✅ Dynamic route for viewing a recipe
        element: <RecipeDetail />,
      },
    ],
    hydrateFallbackElement: <Loader />,
  },
];

const router = createBrowserRouter(routes);
export default router;
