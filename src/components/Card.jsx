import React, { useState, useEffect } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaComment, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASEURL } from "../../utils";
import Modal from "react-modal";
import StarRating from "./Rating";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

const Card = ({
  recipe,
  actionBtn,
  setfunction,
  openComments,
  MyRecipe,
  deleteRecipe,
}) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const isLogin = Boolean(user?._id);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(recipe.likes?.length || 0);
  const [commentsCount, setCommentsCount] = useState(
    recipe.comments?.length || 0
  );
  const [comment, setComment] = useState("");
  const [receivecomment, setReceivecomment] = useState([]); // ✅ FIXED

  useEffect(() => {
    const checkLikeStatus = async () => {
      console.log(user.token);
      try {
        const response = await axios.get(
          `${BACKEND_BASEURL}/likes/${recipe._id}`,
          {
            withCredentials: true
          }
        );
        setLiked(response.data.userLiked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    if (isLogin) {
      checkLikeStatus();
    }
  }, [recipe._id]);

  const followHandler = () => {
    console.log("follow");
  };

  const likeHandler = async () => {
    try {
      await axios.patch(
        `${BACKEND_BASEURL}/recipe/like/${recipe._id}`,
        {},
        {
          withCredentials: true
        }
      );

      setLiked((prevLiked) => {
        const newLiked = !prevLiked;
        setLikes((prevLikes) => (newLiked ? prevLikes + 1 : prevLikes - 1));
        return newLiked;
      });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleComments = async () => {
    setfunction((prev) => (prev === recipe._id ? null : recipe._id));
    try {
      const recommands = await axios.get(
        `${BACKEND_BASEURL}/comments/${recipe._id}`,
        {
          withCredentials: true
        }
      );
      setReceivecomment(recommands.data.comments);
      setCommentsCount(recommands.data.comments.length);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const submitComment = async () => {
    if (!comment.trim()) return;
    try {
      await axios.patch(
        `${BACKEND_BASEURL}/recipe/command/${recipe._id}`, // ✅ FIXED ENDPOINT
        { text: comment },
        {
          withCredentials: true
        }
      );
      setComment("");

      // Fetch updated comments
      const updatedComments = await axios.get(
        `${BACKEND_BASEURL}/comments/${recipe._id}`,
        {
          withCredentials: true
        }
      );
      setReceivecomment(updatedComments.data.comments);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const shareRecipe = () => {
    const recipeUrl = `${window.location.origin}/recipes/${recipe._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title,
          text: "Check out this amazing recipe!",
          url: recipeUrl,
        })
        .then(() => console.log("Recipe shared successfully"))
        .catch((error) => console.error("Error sharing recipe:", error));
    } else {
      navigator.clipboard.writeText(recipeUrl);
      alert("Recipe link copied to clipboard!");
    }
  };

  return (
    <>
      <div className="card card-compact bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        {/* Image Section */}
        <div className="relative">
          <img
            className="w-full h-72 object-cover"
            src={recipe.image || "https://via.placeholder.com/150"}
            alt={recipe.title || "Recipe Image"}
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl text-gray-800 truncate">
              {recipe.title || "Untitled Recipe"}
            </h2>
            {/* {isLogin && actionBtn && (
              <button
                className="inline-flex items-center px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
                onClick={isLogin ? followHandler : null}
              >
                follow
              </button>
            )} */}
          </div>

          {/* Actions: Like & Comment */}
          {actionBtn && (
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-4">
                {/* Like Button */}

                <div
                  className="flex items-center cursor-pointer hover:scale-110 transition"
                  onClick={isLogin ? likeHandler : null}
                  aria-label="Like Recipe"
                >
                  {liked ? (
                    <IoIosHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <IoIosHeartEmpty className="w-6 h-6 text-gray-500 hover:text-red-500" />
                  )}
                  <span className="ml-1 text-gray-700">{likes}</span>
                </div>

                {/* Comment Button */}
                <div
                  className="flex items-center cursor-pointer hover:scale-110 transition"
                  onClick={toggleComments}
                >
                  <FaComment className="w-6 h-6 text-gray-500 hover:text-blue-500" />
                  <span className="ml-1 text-gray-700">{commentsCount}</span>
                </div>
                <div
                  className="flex items-center cursor-pointer hover:scale-110 transition"
                  onClick={shareRecipe}
                >
                  <FaShareAlt className="w-6 h-6 text-gray-500 hover:text-green-500" />
                </div>
              </div>

              {/* Star Rating */}
              <div>{actionBtn && <StarRating recipeId={recipe._id} />}</div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center mt-5">
            <button
              className="w-full px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-all shadow-md"
              onClick={() => navigate(`/recipes/${recipe._id}`)}
            >
              View Recipe
            </button>

            {MyRecipe && (
              <button
                className="ml-3 px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all shadow-md"
                onClick={() => deleteRecipe(recipe._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      <Modal
        isOpen={openComments === recipe._id}
        onRequestClose={toggleComments}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-greybg-opacity-90"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleComments}
            >
              ✕
            </button>
          </div>

          {/* Comments Section */}
          <div className="max-h-60 overflow-y-auto space-y-3 border-t pt-3">
            {Array.isArray(receivecomment) && receivecomment.length > 0 ? (
              receivecomment.map((ele) => (
                <div
                  key={ele._id}
                  className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg"
                >
                  {/* User Profile Image */}
                  <img
                    src={
                      ele.user.profilePicture ||
                      "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full border"
                  />

                  {/* Comment Content */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700">
                      {ele.user.username}
                    </p>
                    <p className="text-gray-600">{ele.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No comments yet.</p>
            )}
          </div>

          {/* Comment Input Box */}
          {isLogin && (
            <div className="mt-4 flex items-center border rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-r-lg transition-all"
                onClick={submitComment}
              >
                Send
              </button>
            </div>
          )}

          {/* Close Button */}
          <button
            className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
            onClick={toggleComments}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Card;
