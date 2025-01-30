import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipeServices from "../services/recipeServices";
import Loader from "../components/Loader";
import RatingComponent from "../components/Rating";
import CommentSection from "../components/CommentSection";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeServices.getRecipeById(id);
        if (!response) {
          throw new Error("Recipe details not found.");
        }
        setRecipe(response);

        // Check if the current user has liked the recipe
        const currentUserId = localStorage.getItem("userId");
        setLiked(response.likes?.includes(currentUserId) || false);
      } catch (err) {
        console.error("Error fetching recipe details:", err.message || err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
     try {
       const userId = localStorage.getItem("userId");
       console.log("Current User ID:", userId); // Debugging

       if (!userId) {
         alert("You need to be logged in to like a recipe.");
         return;
       }

       // Call backend to like/unlike the recipe
       const updatedRecipe = await recipeServices.likeRecipe(id, userId);
       setLiked(!liked); // Toggle liked state
       setRecipe(updatedRecipe); // Update recipe state
     } catch (err) {
       console.error("Error liking recipe:", err.message || err);
       alert("Failed to like the recipe.");
     }
  };

  if (loading) return <Loader />;
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
        <button
          onClick={handleLike}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={liked ? "/public/Images/love.png" : "/Images/heart.png"}
            alt={liked ? "Liked" : "Like"}
            className="w-8 h-8"
          />
          <span className="text-gray-600">{liked ? "Liked" : "Like"}</span>
        </button>

        <p className="text-gray-800 mb-4">
          <strong>Cooking Time:</strong> {recipe.cookingTime || "N/A"} minutes
        </p>
        <p className="text-gray-800 mb-4">
          <strong>Servings:</strong> {recipe.servings || "N/A"}
        </p>
        <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients?.length > 0 ? (
            recipe.ingredients.map((ingredient, index) => (
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
      <RatingComponent recipeId={id} />
      <CommentSection recipeId={id} comments={recipe.comments || []} />
    </div>
  );
};

export default RecipeDetail;
