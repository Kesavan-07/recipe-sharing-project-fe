import instance from "./instance";

const recipeServices = {
    createRecipe: async (data) => {
        return await instance.post("/user/recipes", data);
    },

  getAllRecipes: async () => {
    return await instance.get("/user/recipes");
  },

  getRecipeById: async (id) => {
    return await instance.get(`/user/recipes/${id}`);
  },

  updateRecipe: async (id, data) => {
    return await instance.put(`/user/recipes/${id}`, data);
  },

  deleteRecipe: async (id) => {
    return await instance.delete(`/user/recipes/${id}`);
  },
};

export default recipeServices;
