import React from "react";
import { useLoaderData } from "react-router";

const Recipes = () => {
  const recipes = useLoaderData(); // Fetch recipes from loader

  return (
    <div>
      <h1 className="text-3xl font-bold">🍽 My Recipes</h1>
      <ul className="mt-4 space-y-3">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe.id} className="p-4 border rounded-lg shadow">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <p>{recipe.description}</p>
            </li>
          ))
        ) : (
          <p className="text-red-500">No recipes found.</p>
        )}
      </ul>
    </div>
  );
};

export default Recipes;
