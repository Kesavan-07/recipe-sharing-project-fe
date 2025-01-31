import axios from "axios";

const API_BASE_URL =
  "https://recipe-sharing-project-be.onrender.com/api/v1/recipes";

const recipeServices = {
  createRecipe: async (data) => {
    try {
      let formData = new FormData(); // Ensure formData is declared only once

      // Append text fields
      formData.append("title", data.title);
      formData.append("ingredients", data.ingredients);
      formData.append("instructions", data.instructions);
      formData.append("cookingTime", data.cookingTime);
      formData.append("servings", data.servings);

      // Append image file (Only if an image is selected)
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

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

  getAllRecipes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all recipes:", error);
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
        error.response?.data || error.message
      );
      throw error;
    }
  },

  likeRecipe: async (recipeId, userId) => {
    try {
      const token = localStorage.getItem("token");
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
      console.error(
        "Error liking recipe:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  addComment: async (recipeId, text) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/comment`,
        { recipeId, text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default recipeServices;
