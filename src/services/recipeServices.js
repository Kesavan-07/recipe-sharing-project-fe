import axios from "axios";

const API_BASE_URL =
  "https://recipe-sharing-project-be.onrender.com/api/v1/recipes";

const recipeServices = {
  getAllRecipes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all recipes:", error);
      return [];
    }
  },

  getMyRecipes: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/my-recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching my recipes:",
        error.response?.data || error
      );
      return [];
    }
  },

  getRecipeById: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching recipe by ID:",
        error.response?.data || error
      );
      throw error;
    }
  },

  createRecipe: async (formData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("ingredients", data.ingredients);
    formData.append("instructions", data.instructions);
    formData.append("cookingTime", data.cookingTime);
    formData.append("servings", data.servings);
    if (data.image) {
      formData.append("image", data.image); // Append the image file
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating recipe:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  addRating: async (recipeId, rating) => {
    try {
      const token = localStorage.getItem("token");
      return await axios.post(
        `${API_BASE_URL}/rate`,
        { recipeId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || error);
    }
  },

  addComment: async (recipeId, text) => {
    try {
      const token = localStorage.getItem("token");
      return await axios.post(
        `${API_BASE_URL}/comment`,
        { recipeId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    }
  },

  likeRecipe: async (recipeId, userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${recipeId}/like`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error liking recipe:", error.message || error);
      throw error;
    }
  },
};

export default recipeServices;
