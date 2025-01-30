import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipeServices from "../services/recipeServices";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [refresh, setRefresh] = useState(false);
  const userId = localStorage.getItem("userId"); // ✅ Get logged-in user ID

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeServices.getRecipeById(id);
        setRecipe(response.data);
      } catch (error) {
        console.error("❌ Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, refresh]);

  // ✅ Submit Rating
  const handleRating = async (newRating) => {
    try {
      await recipeServices.rateRecipe(id, newRating);
      alert("✅ Rating submitted!");
      setRefresh(!refresh);
    } catch (error) {
      console.error("❌ Error submitting rating:", error);
    }
  };

  // ✅ Submit Comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Comment cannot be empty!");
    try {
      await recipeServices.addComment(id, comment);
      alert("✅ Comment added!");
      setComment("");
      setRefresh(!refresh);
    } catch (error) {
      console.error("❌ Error adding comment:", error);
    }
  };

  // ✅ Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      await recipeServices.deleteComment(id, commentId);
      alert("✅ Comment deleted!");
      setRefresh(!refresh);
    } catch (error) {
      console.error("❌ Error deleting comment:", error);
    }
  };

  if (loading)
    return <p className="text-center text-lg">Loading recipe details...</p>;
  if (!recipe)
    return <p className="text-center text-red-500">Recipe not found.</p>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>

      {/* Display Recipe Image */}
      {recipe.image ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full max-h-96 object-cover rounded-lg my-4"
        />
      ) : (
        <p className="text-gray-500">No image available</p>
      )}

      {/* Display YouTube Video (if available) */}
      {recipe.video && recipe.video.includes("youtube.com") && (
        <div className="my-4">
          <h3 className="text-xl font-semibold">Video Tutorial:</h3>
          <iframe
            width="100%"
            height="400"
            src={recipe.video}
            title="Recipe Video"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}

      {/* Recipe Details */}
      <h3 className="text-xl font-semibold mt-4">Ingredients:</h3>
      <ul className="list-disc pl-5 text-gray-700">
        {recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))
        ) : (
          <p className="text-gray-500">No ingredients listed.</p>
        )}
      </ul>

      <h3 className="text-xl font-semibold mt-4">Instructions:</h3>
      <p className="text-gray-700">
        {recipe.instructions || "No instructions provided."}
      </p>

      {/* Cooking Time & Servings */}
      <div className="flex justify-between mt-6 text-gray-700">
        <p>
          <strong>Cooking Time:</strong> {recipe.cookingTime || "N/A"} mins
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings || "N/A"}
        </p>
      </div>

      {/* ⭐ Recipe Rating System */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Rate this Recipe:</h3>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleRating(num)}
              className={`px-3 py-1 rounded ${
                num <= rating ? "bg-yellow-500 text-white" : "bg-gray-300"
              }`}
            >
              {num} ⭐
            </button>
          ))}
        </div>
        <p className="text-gray-700 mt-2">
          <strong>Average Rating:</strong>{" "}
          {recipe.ratings.length > 0
            ? (
                recipe.ratings.reduce((a, b) => a + b.rating, 0) /
                recipe.ratings.length
              ).toFixed(1)
            : "No ratings yet"}
        </p>
      </div>

      {/* 💬 Recipe Comments */}
      <h3 className="text-xl font-semibold mt-6">Comments:</h3>
      {recipe.comments.length > 0 ? (
        recipe.comments.map((c, index) => (
          <div key={c._id} className="flex justify-between border-b py-2">
            <p>{c.text}</p>
            {c.user === userId && (
              <button
                onClick={() => handleDeleteComment(c._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      {/* Add a Comment Form */}
      <form onSubmit={handleComment} className="mt-4">
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeDetail;
