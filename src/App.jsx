import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Layout from "./layouts/Layout";
import { BACKEND_BASEURL } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "./redux/app/recipeSlice";
import { addUser } from "./redux/app/userSlice";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const isLogin = Boolean(user?._id);

  // State for error and loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const userProfile = await axios.get(`${BACKEND_BASEURL}/profile`, {
        withCredentials: true,
      });
      dispatch(addUser(userProfile.data.user));
    } catch (error) {
      navigate("/login");
      console.error("Profile fetch error:", error.message);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_BASEURL}/recipes`, {
          withCredentials: true,
        });

        if (Array.isArray(response.data)) {
          dispatch(addRecipe(response.data));
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
    if (isLogin) {
      fetchProfile();
    }
  }, []);

  return (
    <Layout>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Outlet />
    </Layout>
  );
};

export default App;
