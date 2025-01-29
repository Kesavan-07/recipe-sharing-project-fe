import React, { useEffect, useState } from "react";
import recipeServices from "../../services/recipeServices";

const RecipeDashboard = () => {
  const [recipes, setRecipes] = useState([]); // ✅ Always start with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipeServices.getAllRecipes();
        console.log("Fetched Recipes:", response); // ✅ Debug response

        if (!Array.isArray(response)) {
          throw new Error("Invalid data format: Expected an array.");
        }

        setRecipes(response);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Recipe Dashboard</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe._id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeDashboard;
