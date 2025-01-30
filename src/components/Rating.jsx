import React, { useState } from "react";
import recipeServices from "../services/recipeServices";

const RatingComponent = ({ recipeId }) => {
  const [rating, setRating] = useState(0);

  const submitRating = async (newRating) => {
    setRating(newRating);
    await recipeServices.addRating(recipeId, newRating);
    alert("Rating submitted!");
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${
            star <= rating ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => submitRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingComponent;
