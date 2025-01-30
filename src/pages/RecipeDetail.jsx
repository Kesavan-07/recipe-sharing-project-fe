import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipeServices from "../services/recipeServices";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState(""); // State for new comment

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeServices.getRecipeById(id);
        setRecipe(response);
        const currentUserId = localStorage.getItem("userId");
        setLiked(response.likes?.includes(currentUserId) || false);
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get logged-in user ID
      if (!userId) {
        alert("Please log in to like the recipe.");
        return;
      }

      const updatedRecipe = await recipeServices.likeRecipe(id, userId);
      setLiked(!liked); // Toggle the like state
      setRecipe(updatedRecipe); // Update the recipe with the new like count
    } catch (error) {
      console.error("Error liking recipe:", error.message || error);
      alert("Failed to like the recipe. Please try again.");
    }
  };

  const handleComment = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in to comment.");
        return;
      }

      if (!newComment.trim()) {
        alert("Comment cannot be empty.");
        return;
      }

      const commentData = { userId, text: newComment }; // Example comment data
      const updatedRecipe = await recipeServices.addComment(id, commentData);

      setRecipe(updatedRecipe); // Update recipe with new comments
      setNewComment(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error.message || error);
      alert("Failed to add comment. Please try again.");
    }
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Recipe link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error.message || error);
        alert("Failed to copy link. Please try manually.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>
      <img
        src={recipe.image || "https://via.placeholder.com/500"}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      {/* Instagram-like Like, Comment, and Share Section */}
      <div className="flex items-center justify-between max-w-md mx-auto py-4">
        {/* Like Button */}
        <div className="flex items-center cursor-pointer" onClick={handleLike}>
          <img
            src={liked ? "/Images/like.png" : "/Images/liked.png"}
            alt="Like"
            className="w-6 h-6 mr-2"
          />
          <span>{liked ? "Liked" : "Like"}</span>
        </div>

        {/* Comment Button */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => alert("Use the comment input below!")} // Placeholder for now
        >
          <img
            src="/Images/comment.png"
            alt="Comment"
            className="w-6 h-6 mr-2"
          />
          <span>Comment</span>
        </div>

        {/* Share Button */}
        <div className="flex items-center cursor-pointer" onClick={handleShare}>
          <img src="/Images/share.png" alt="Share" className="w-6 h-6 mr-2" />
          <span>Share</span>
        </div>
      </div>

      {/* Likes and Comments Count */}
      <div className="max-w-md mx-auto py-2">
        <p className="font-bold">{recipe.likes?.length || 0} likes</p>
        <p className="text-gray-600">{recipe.comments?.length || 0} comments</p>
      </div>

      {/* Add Comment Section */}
      <div className="max-w-md mx-auto py-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleComment} // Call the comment handler
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Post
        </button>
      </div>

      {/* Recipe Details */}
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
    </div>
  );
};

export default RecipeDetail;
