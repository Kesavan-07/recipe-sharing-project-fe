import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { BACKEND_BASEURL } from "../../utils";

const StarRating = ({ recipeId }) => {
  const [userRating, setUserRating] = useState(null); // Start as null
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASEURL}/rating/${recipeId}`,
          { withCredentials: true }
        );

        console.log(response.data.ratings);

        // Extract user ID from session or auth (Make sure backend sends user ID)
        const userId = response.data.userId; // Ensure the backend provides this!

        // Find the logged-in user's rating
        // const userRatingObj = response.data.ratings.find(
        //   (rating) => rating.user._id.toString() === userId
        // );
        response.data.ratings.forEach((ele) => {
          if (ele.user._id === userId) {
            setUserRating(ele.rating); // Set existing rating
            console.log(ele.user._id + "   true");
          } else {
            console.log(ele.user._id + " false");
          }
        });

        // if (userRatingObj) {
        //   console.log(userRatingObj.user._id + " true");
        // } else {
        //   console.log("User rating not found");
        // }

        // console.log(userRatingObj + "  jdkfjjfkljdlkjlk");
        // if (userRatingObj) {
        //   setUserRating(userRatingObj.rating); // Set existing rating
        // } else {
        //   setUserRating(0); // Allow new rating
        // }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    fetchUserRating();
  }, [recipeId]);

  const handleRating = async (newRating) => {
    if (loading || userRating > 0) return; // Prevent re-rating if already rated
    setLoading(true);

    try {
      await axios.patch(
        `${BACKEND_BASEURL}/recipe/rating/${recipeId}`,
        { rating: newRating },
        { withCredentials: true }
      );

      setUserRating(newRating); // Set new rating
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
          onClick={() => handleRating(star)}
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
