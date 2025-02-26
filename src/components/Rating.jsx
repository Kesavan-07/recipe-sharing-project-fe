import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { BACKEND_BASEURL } from "../../utils";
import { useSelector } from "react-redux";

const StarRating = ({ recipeId }) => {
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user);
  const isLogin = Boolean(user?._id);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASEURL}/rating/${recipeId}`,
          { withCredentials: true }
        );

        const { ratings, userId } = response.data; // Extract data

        if (!userId) return console.warn("User ID not provided by backend");

        const userRatingObj = ratings.find(
          (rating) => rating.user._id === userId
        );

        if (userRatingObj) {
          setUserRating(userRatingObj.rating);
        } else {
          setUserRating(0); // Allow new rating
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    if (isLogin) {
      fetchUserRating();
    } else {
      setUserRating(Math.floor(Math.random() * 5) + 1); // Assign random rating for non-logged-in users
    }
  }, [recipeId, isLogin]);

  const handleRating = async (newRating) => {
    if (loading || userRating > 0) return; // Prevent re-rating
    setLoading(true);

    try {
      await axios.patch(
        `${BACKEND_BASEURL}/recipe/rating/${recipeId}`,
        { rating: newRating },
        { withCredentials: true }
      );

      setUserRating(newRating);
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer transition-all ${
            (hover || userRating) >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => (isLogin ? handleRating(star) : null)}
          onMouseEnter={() => userRating === 0 && setHover(star)}
          onMouseLeave={() => setHover(null)}
          style={{
            pointerEvents: loading || userRating > 0 ? "none" : "auto",
          }}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">({userRating || "0"})</span>
    </div>
  );
};

export default StarRating;
