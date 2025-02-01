import axios from "axios";

const API_BASE_URL =
  "https://recipe-sharing-project-be.onrender.com/api/v1/recipes";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: Token is missing.");
  return token;
};

const recipeServices = {
  createRecipe: async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("ingredients", data.ingredients);
      formData.append("instructions", data.instructions);
      formData.append("cookingTime", data.cookingTime);
      formData.append("servings", data.servings);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await axios.post(`${API_BASE_URL}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
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

  getMyRecipes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/my-recipes`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching recipes:",
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
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
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
      const response = await axios.post(
        `${API_BASE_URL}/${recipeId}/like`,
        { userId },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
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
      const response = await axios.post(
        `${API_BASE_URL}/${recipeId}/comments`,
        { text },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
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

  rateRecipe: async (recipeId, userId, rating) => {
    try {
      if (rating < 1 || rating > 5)
        throw new Error("Rating must be between 1 and 5.");

      const response = await axios.post(
        `${API_BASE_URL}/${recipeId}/rate`,
        { userId, rating },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error rating recipe:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to submit rating"
      );
    }
  },
};

export default recipeServices;
