import React from "react";
import { useLoaderData } from "react-router";
import recipeServices from "../../services/recipeServices";
import { toast } from "react-toastify";

const RecipeDashboard = () => {
  const recipes = useLoaderData(); 

  const handleRecipeSave = (recipeId) => {
    recipeServices
      .saveRecipe(recipeId) 
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An error occurred.");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Recipe Dashboard</h2>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="border rounded p-3 mb-3">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <button
              className="bg-green-500 text-white px-3 py-1 mt-2"
              onClick={() => handleRecipeSave(recipe._id)}
            >
              Save Recipe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDashboard;
