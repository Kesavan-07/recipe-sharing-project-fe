import recipeServices from "../../services/recipeServices";

const recipeLoader = async ({ params }) => {
  try {
    const response = await recipeServices.getRecipeById(params.id); 
    return response.data;
  } catch (error) {
    return {}; 
  }
};

export default recipeLoader;
