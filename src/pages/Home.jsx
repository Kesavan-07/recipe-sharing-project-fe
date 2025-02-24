import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASEURL } from "../../utils";
import Card from "../components/Card";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openComments, setOpenComments] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASEURL}/recipes`, {
          withCredentials: true,
        });

        if (Array.isArray(response.data)) {
          setRecipes(response.data);
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
  }, []);
  const setfunction = (res) => {
    console.log(res);
    setOpenComments(res);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Card
            key={recipe._id}
            recipe={recipe}
            actionBtn={true}
            setfunction={setfunction}
            openComments={openComments}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}
    </div>
  );
};

export default Home;
