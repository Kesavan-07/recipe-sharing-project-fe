import axios from "axios";

const getAllRecipes = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Or however you store the token

    const response = await axios.get(
      "https://recipe-sharing-project-be.onrender.com/user/recipes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching recipes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default {
  getAllRecipes,
};
