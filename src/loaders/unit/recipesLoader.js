import recipeServices from "../../services/recipeServices";

const recipesLoader = async () => {
    try {
      const recipes = await recipeServices.getAllRecipes();
      return recipes; // Return all recipes
    } catch (error) {
      console.error("Error loading recipes:", error);
      return []; // Return an empty array in case of error
    }
};

export default recipesLoader;
