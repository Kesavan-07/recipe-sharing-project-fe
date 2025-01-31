import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import recipeServices from "../../services/recipeServices";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await recipeServices.getMyRecipes(token);
        console.log("Fetched My Recipes:", response);
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
    fetchMyRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 Playwrite-IN-font ">
        My Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe._id}`} // Navigate to the recipe details page
            key={recipe._id}
            className="block bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={recipe.image || "https://via.placeholder.com/150"} // Placeholder image if none is provided
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {recipe.title}
              </h2>
              <p className="text-sm text-gray-600">
                Cooking Time: {recipe.cookingTime} mins
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
