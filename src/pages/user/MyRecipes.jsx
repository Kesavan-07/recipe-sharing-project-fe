import React, { useEffect, useState } from "react";
import recipeServices from "../../services/recipeServices";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const response = await recipeServices.getMyRecipes();
      setRecipes(response);
    };
    fetchMyRecipes();
  }, []);

  return (
    <div>
      <h1>My Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => <p key={recipe._id}>{recipe.title}</p>)
      )}
    </div>
  );
};

export default MyRecipes;
