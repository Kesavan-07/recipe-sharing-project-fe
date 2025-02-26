import React from "react";
import { useSelector } from "react-redux";
import MealPlanner from "../components/MealPlanner";
const CreateMealPlanner = () => {
  const allRecipes = useSelector((store) => store.recipe.allrecipe[0]);
  console.log(allRecipes);

  return (
    <>
      <MealPlanner recipe={allRecipes} />
    </>
  );
};

export default CreateMealPlanner;
