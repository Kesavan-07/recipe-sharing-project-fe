import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipeServices from "../services/recipeServices";

const RecipeDetail = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeServices.getRecipeById(id);
        console.log("Fetched Recipe Response:", response);
        if (!response) {
          throw new Error("Recipe details not found.");
        }
        setRecipe(response);
      } catch (err) {
        console.error("Error fetching recipe details:", err.message || err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!recipe) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        {recipe.title || "Recipe"}
      </h1>
      <div className="max-w-3xl mx-auto">
        <img
          src={recipe.image || "https://via.placeholder.com/500"}
          alt={recipe.title || "Recipe"}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-800 mb-4">
          <strong>Cooking Time:</strong> {recipe.cookingTime || "N/A"} minutes
        </p>
        <p className="text-gray-800 mb-4">
          <strong>Servings:</strong> {recipe.servings || "N/A"}
        </p>
        <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.Ingredients?.length > 0 ? (
            recipe.Ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))
          ) : (
            <p className="text-gray-600">No ingredients listed.</p>
          )}
        </ul>
        <h2 className="text-xl font-bold mb-2">Instructions:</h2>
        <p className="text-gray-700 mb-4">
          {recipe.instructions || "No instructions available."}
        </p>
        {recipe.video && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Video Tutorial:</h2>
            <iframe
              src={recipe.video}
              title={`${recipe.title || "Recipe"} Tutorial`}
              className="w-full h-64 rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
