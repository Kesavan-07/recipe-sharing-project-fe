import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import recipeServices from "../services/recipeServices";
import Loader from "../components/Loader"; // Import Loader

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await recipeServices.getAllRecipes();
        console.log("Fetched All Recipes:", response);
        if (!response || response.length === 0) {
          setError("No recipes found.");
        } else {
          setRecipes(response);
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllRecipes();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      className="container mx-auto p-6"
      style={{
        backgroundImage: `url('/public/Images/home1jpg.jpg')`, // Update the path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 Playwrite-IN-font text-gray-600 ">
        Recipes you'll love
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe._id}`}
            key={recipe._id} // Ensure _id is unique
            className="block bg-gray border border-gray-200 rounded-lg shadow transition duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
          >
            <img
              src={recipe.image || "https://via.placeholder.com/150"}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {recipe.title}
              </h2>
              <p className="text-sm text-black">
                Cooking Time: {recipe.cookingTime} mins
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
