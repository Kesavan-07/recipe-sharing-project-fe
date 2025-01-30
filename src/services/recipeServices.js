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
      const token = localStorage.getItem("token"); // Ensure token is retrieved
      const response = await axios.get(`${API_BASE_URL}/my-recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching my recipes:",
        error.response?.data || error.message
      );
      return [];
    }
  },

  // ✅ Fixed function to include token retrieval
  getRecipeById: async (id) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response || !response.data) {
        throw new Error("No data returned from API.");
      }
      return response.data; // Return recipe details
    } catch (error) {
      console.error(
        "Error fetching recipe by ID:",
        error.response?.data || error.message
      );
      throw error; // Ensure error is caught in the caller
    }
  },

  createRecipe: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
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
      return await instance.post(
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
      return await instance.post(
        `${API_BASE_URL}/comment`,
        { recipeId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    }
    },
  likeRecipe : async (recipeId, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${recipeId}/like`, {
      userId,
    });
    return response.data; 
  } catch (error) {
    console.error("Error liking recipe:", error.message || error);
    throw error;
  }
},
};

export default recipeServices;
