import React from "react";

const SocialFeatures = ({ recipe }) => {
  const shareRecipe = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Recipe URL copied to clipboard!");
  };

  return (
    <div className="mt-4">
      <button
        onClick={shareRecipe}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Share Recipe
      </button>
      <button className="ml-2 bg-red-500 text-white p-2 rounded">
        Follow Author
      </button>
    </div>
  );
};

export default SocialFeatures;
