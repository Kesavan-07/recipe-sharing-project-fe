import React from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home"; // Home page to display all recipes
import Login from "./pages/Login";
import Logout from "./components/Logout";
import RecipeDashboard from "./pages/user/RecipeDashboard"; // Restricted recipe creation
import recipesLoader from "./loaders/unit/recipesLoader";
import Loader from "./components/Loader";

// Updated routes configuration
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />, // Publicly accessible Home page
        loader: recipesLoader, // Fetch all recipes for the Home page
      },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      {
        path: "dashboard",
        element: <RecipeDashboard />, // Recipe creation restricted to logged-in users
        loader: authLoader, // Ensure user is authenticated
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
