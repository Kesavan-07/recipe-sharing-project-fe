import React, { useEffect, useState } from "react";
import recipeServices from "../../services/recipeServices";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await recipeServices.getMyRecipes();
        console.log("📌 My Recipes Response:", response);

        if (!Array.isArray(response)) {
          throw new Error("Invalid data format: Expected an array.");
        }

        setRecipes(response);
      } catch (err) {
        console.error("❌ Error fetching my recipes:", err);
        setError("Failed to load your recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Recipes</h1>

      {loading && (
        <p className="text-center text-blue-500">Loading your recipes...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {recipes.length === 0 && !loading ? (
        <p className="text-center text-gray-500">
          You have not added any recipes yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="p-4 border rounded shadow-md bg-white"
            >
              <img
                src={recipe.image || "https://via.placeholder.com/150"}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
              <p className="text-gray-600">
                {recipe.description
                  ? recipe.description.substring(0, 100) + "..."
                  : "No description available."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
