import React, { useEffect, useState } from "react";
import recipeServices from "../../services/recipeServices";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await recipeServices.getMyRecipes();

        // Debugging
        console.log("Fetched Recipes:", response);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>My Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRecipes;
