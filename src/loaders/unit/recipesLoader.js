import recipeServices from "../../services/recipeServices";

const recipesLoader = async () => {
  try {
    const response = await recipeServices.getAllRecipes(); 
    return response.data;
  } catch (error) {
    return []; 
  }
};

export default recipesLoader;
