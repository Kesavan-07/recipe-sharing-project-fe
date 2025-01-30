import instance from "./instance";

const API_BASE_URL =
  "https://recipe-sharing-project-be.onrender.com/api/v1/recipes";

const recipeServices = {
  getAllRecipes: async () => {
    try {
      const response = await instance.get(`${API_BASE_URL}/all`);
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
      const response = await axios.get(`${API_BASE_URL}/recipes/my-recipes`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });
      return response.data; // Return the array of recipes
    } catch (error) {
      console.error(
        "Error fetching recipes:",
        error.response?.data || error.message
      );
      return []; // Return an empty array on error
    }
  },

  getRecipeById: async (id) =>
    instance.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  createRecipe: async (data) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token from local storage
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await instance.post(`${API_BASE_URL}/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach token
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("❌ Error creating recipe:", error.response?.data || error);
      throw error; // ✅ Ensure error is caught in frontend
    }
  },
  updateRecipe: async (id, data) =>
    instance.put(`${API_BASE_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  deleteRecipe: async (id) =>
    instance.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  rateRecipe: async (recipeId, rating) => {
    const token = localStorage.getItem("token");
    return instance.post(
      "/recipes/rate",
      { recipeId, rating },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  addComment: async (recipeId, text) => {
    const token = localStorage.getItem("token");
    return instance.post(
      "/recipes/comment",
      { recipeId, text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  deleteComment: async (recipeId, commentId) => {
    const token = localStorage.getItem("token");
    return instance.delete("/recipes/comment", {
      data: { recipeId, commentId },
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default recipeServices;
