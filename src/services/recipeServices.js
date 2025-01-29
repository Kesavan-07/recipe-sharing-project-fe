import instance from "./instance";

const BASE_URL =
  "https://recipe-sharing-project-be.onrender.com/api/v1/recipes";

const recipeServices = {
  getAllRecipes: async () => {
    try {
      const response = await instance.get(`${BASE_URL}/all`);
      console.log("📌 Recipes API Response:", response.data);

      if (Array.isArray(response.data)) {
        return response.data;
      } else if (
        response.data.recipes &&
        Array.isArray(response.data.recipes)
      ) {
        return response.data.recipes;
      } else {
        throw new Error("Unexpected API response format.");
      }
    } catch (error) {
      console.error("❌ Error fetching recipes:", error);
      return [];
    }
  },

  // ✅ New: Fetch recipes created by logged-in user
  getMyRecipes: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await instance.get(`${BASE_URL}/my-recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📌 My Recipes API Response:", response.data);
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        throw new Error("Unexpected API response format.");
      }
    } catch (error) {
      console.error("❌ Error fetching my recipes:", error);
      return [];
    }
  },

  getRecipeById: async (id) => instance.get(`${BASE_URL}/${id}`),
  createRecipe: async (data) => instance.post(`${BASE_URL}/create`, data),
  updateRecipe: async (id, data) => instance.put(`${BASE_URL}/${id}`, data),
  deleteRecipe: async (id) => instance.delete(`${BASE_URL}/${id}`),
};

export default recipeServices;
