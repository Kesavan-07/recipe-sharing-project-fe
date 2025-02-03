import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <p className="text-gray-600 text-center">No recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="border rounded-lg p-4 shadow-md">
          <img
            src={recipe.image || "/public/Images/cake.jpg"}
            alt={recipe.title}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="text-xl font-bold mt-2">{recipe.title}</h2>
          <p className="text-gray-700">{recipe.description}</p>
          <Link
            to={`/recipe/${recipe.id}`}
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Recipe
          </Link>
        </div>
      ))}
    </div>
  );
};

// ✅ Prop validation to avoid errors
RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeList;
