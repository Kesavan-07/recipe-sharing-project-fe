import React, { useState } from "react";

const MealPlanner = ({ recipes }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

  const addRecipeToMealPlan = (recipe) => {
    setSelectedRecipes([...selectedRecipes, recipe]);
  };

  const generateShoppingList = () => {
    const ingredients = selectedRecipes.flatMap((recipe) => recipe.ingredients);
    alert(`Shopping List:\n${ingredients.join("\n")}`);
  };

  const saveMealPlan = () => {
    setMealPlan(selectedRecipes);
    alert("Meal plan saved!");
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Meal Planner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded">
            <h3 className="text-lg font-bold">{recipe.title}</h3>
            <button
              onClick={() => addRecipeToMealPlan(recipe)}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Add to Meal Plan
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={generateShoppingList}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Generate Shopping List
      </button>
      <button
        onClick={saveMealPlan}
        className="mt-4 bg-yellow-500 text-white p-2 rounded"
      >
        Save Meal Plan
      </button>
    </div>
  );
};

export default MealPlanner;
