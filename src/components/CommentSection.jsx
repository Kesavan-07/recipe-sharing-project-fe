import React, { useState } from "react";
import recipeServices from "../services/recipeServices";

const CommentSection = ({ recipeId, comments = [] }) => {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments || []);

    const handleAddComment = async () => {
   try {
     const userId = localStorage.getItem("userId");
     const comment = { userId, text: newComment }; // Assuming `newComment` is the input value
     const updatedRecipe = await recipeServices.addComment(recipeId, comment);

     setComments(updatedRecipe.comments); // Update state with new comments
     setNewComment(""); // Clear the input field
   } catch (error) {
     console.error("Error adding comment:", error.message || error);
     alert("Failed to add comment. Please try again.");
   }
 };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Comments</h2>

      {/* ✅ Check if there are any comments before mapping */}
      {allComments.length > 0 ? (
        <ul className="list-disc pl-5">
          {allComments.map((comment, index) => (
            <li key={index} className="text-gray-700">
              {comment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      )}

      <div className="mt-4">
        <textarea
          className="w-full border rounded p-2"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
