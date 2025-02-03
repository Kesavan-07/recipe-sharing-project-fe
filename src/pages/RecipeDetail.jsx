import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipeServices from "../services/recipeServices";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeServices.getRecipeById(id);
        setRecipe(response);

        const currentUserId = localStorage.getItem("userId");
        setLiked(response.likes?.includes(currentUserId) || false); 
        setRating(response.userRating || 0); 
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  // Handle sharing the recipe
  const handleShare = async () => {
    const recipeUrl = `${window.location.origin}/recipe/${id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this recipe: ${recipe.title}!`,
          url: recipeUrl,
        });
        console.log("Recipe shared successfully!");
      } catch (err) {
        console.error("Error sharing recipe:", err);
      }
    } else {
      navigator.clipboard.writeText(recipeUrl).then(() => {
        alert("Recipe link copied to clipboard!");
      });
    }
  };

  // Handle liking the recipe
  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in to like the recipe.");
        return;
      }

      const updatedRecipe = await recipeServices.likeRecipe(id, userId);

      if (updatedRecipe) {
        setLiked(!liked);
        setRecipe(updatedRecipe);
      } else {
        alert("Failed to update like status.");
      }
    } catch (error) {
      console.error("Error liking recipe:", error.message || error);
    }
  };

  // Handle rating the recipe
  const handleRating = async (newRating) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in to rate the recipe.");
        return;
      }

      const updatedRecipe = await recipeServices.rateRecipe(
        id,
        userId,
        newRating
      );

      if (updatedRecipe) {
        setRating(newRating);
        setRecipe(updatedRecipe);
      } else {
        alert("Failed to update rating.");
      }
    } catch (error) {
      console.error("Error rating recipe:", error.message || error);
    }
  };

  // Handle posting a comment
  const handleComment = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in to comment on the recipe.");
        return;
      }

      const updatedRecipe = await recipeServices.addComment(id, {
        userId,
        text: newComment,
      });

      if (updatedRecipe) {
        setRecipe(updatedRecipe);
        setNewComment(""); // Clear the input after posting
      } else {
        alert("Failed to post comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error.message || error);
    }
  };

  if (loading) return <p >Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>
      <img
        src={recipe.image || "/public/Images/cake.jpg"}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      {/* Like, Comment, and Share Buttons */}
      <div className="flex justify-around items-center py-4 border-t border-gray-200">
        {/* Like Button */}
        <button className="flex items-center gap-2" onClick={handleLike}>
          <img
            src="/Images/like.png" // Ensure this PNG file exists in your public directory
            alt="Like"
            className="w-6 h-6"
          />
          <span>{liked ? "Unlike" : "Like"}</span>
        </button>

        {/* Comment Button */}
        <button
          className="flex items-center gap-2"
          onClick={() => setShowComments(!showComments)}
        >
          <img
            src="/Images/comment.png" 
            alt="Comment"
            className="w-6 h-6"
          />
          <span>Comment</span>
        </button>

        {/* Share Button */}
        <button className="flex items-center gap-2" onClick={handleShare}>
          <img
            src="/public/share.png" 
            alt="Share"
            className="w-6 h-6"
          />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="max-w-md mx-auto py-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            onClick={handleComment}
            className="bg-gray-800 text-white px-4 py-2 rounded mt-2"
          >
            Post
          </button>
        </div>
      )}

      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mb-2">Instructions:</h2>
        <p>{recipe.instructions}</p>
      </div>

      {/* Ratings Section */}
      <div className="max-w-md mx-auto mt-6">
        <h2 className="text-xl font-bold mb-2">Rate this Recipe:</h2>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <p className="mt-2">
          Average Rating: {recipe.averageRating || "No ratings yet"}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetail;