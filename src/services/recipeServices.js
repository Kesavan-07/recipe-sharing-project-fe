import instance from "./instance";

const BASE_URL =
  "https://recipe-sharing-project-be.onrender.com/api/v1/recipes"; // ✅ Ensure correct API URL

const recipeServices = {
  getAllRecipes: async () => {
    try {
      const response = await instance.get("/all");
      console.log("Recipes API Response:", response.data); // ✅ Debug API response

      if (!Array.isArray(response.data)) {
        throw new Error("Unexpected API response format.");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; // ✅ Return an empty array to prevent `.map()` errors
    }
  },
  getRecipeById: async (id) => instance.get(`${BASE_URL}/${id}`),
  createRecipe: async (data) => instance.post(`${BASE_URL}/create`, data),
  updateRecipe: async (id, data) => instance.put(`${BASE_URL}/${id}`, data),
  deleteRecipe: async (id) => instance.delete(`${BASE_URL}/${id}`),
};

export default recipeServices;
