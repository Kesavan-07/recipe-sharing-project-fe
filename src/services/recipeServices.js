import axios from "axios";

const API_BASE_URL =
  "https://recipe-sharing-project-be.onrender.com/api/v1/recipes";

const recipeServices = {
  createRecipe: async (data) => {
    try {
      let formData = new FormData(); // Ensure formData is declared only once
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
  getMyRecipes: async (token) => {
    try {
          const response = await axios.get(`${API_BASE_URL}/my-recipes`);


    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json(); // Attempt to parse the response as JSON
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
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
        `${API_BASE_URL}/${recipeId}/comments`,
        { text },
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

  rateRecipe: async (recipeId, userId, rating) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${recipeId}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, rating }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Failed to submit rating");
      }

      return await response.json();
    } catch (error) {
      console.error("Error rating recipe:", error);
      throw error;
    }
  },
};

export default recipeServices;
