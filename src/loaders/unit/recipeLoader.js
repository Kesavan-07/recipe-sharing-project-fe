import recipeServices from "../../services/recipeServices";

const recipeLoader = async ({ params }) => {
  try {
    const response = await recipeServices.getRecipeById(params.id);
    return response.data;
  } catch {
    console.error("Failed to load recipe:", params.id);
    return {};
  }
};

export default recipeLoader;
