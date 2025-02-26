import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecipeDashboard from "./pages/user/RecipeDashboard";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/user/Profile";
import MyRecipes from "./pages/user/MyRecipes";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Navigate } from "react-router-dom";
import CreateMealPlanner from "./pages/CreateMealPlanner";
import Community from "./pages/Community";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> }, // Public Home Page
      { path: "login", element: <Login /> }, // Public Login Page

      // Protected Routes
      {
        path: "user",
        element: <ProtectedRoute />, // Wrap in ProtectedRoute
        children: [
          { path: "dashboard", element: <RecipeDashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "recipes", element: <MyRecipes /> },
          { path: "community", element: <Community/> }, // My Recipes
        ],
      },

      { path: "recipes/:id", element: <RecipeDetail /> },
      { path: "/mealplanner", element: <CreateMealPlanner /> },
      { path: "*", element: <Navigate to="/" replace /> }, // Public Recipe Details Page
    ],
    hydrateFallbackElement: <Loader />,
  },
];

const router = createBrowserRouter(routes);

export default router;
