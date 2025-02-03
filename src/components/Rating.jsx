import { useState } from "react";
import PropTypes from "prop-types"; 
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

// Prop validation
RatingComponent.propTypes = {
  recipeId: PropTypes.string.isRequired, // Ensure recipeId is a required string
};

export default RatingComponent;
