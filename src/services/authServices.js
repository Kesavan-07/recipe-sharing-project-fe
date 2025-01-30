import instance from "./instance";

const BASE_URL = "https://recipe-sharing-project-be.onrender.com/api/v1/auth";

const authServices = {
  register: async (data) => {
    return instance
      .post(`${BASE_URL}/register`, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response?.data || error.message;
      });
  },

  login: async (data) => {
    try {
      const response = await instance.post(`${BASE_URL}/login`, data);
      console.log("Login Response:", response.data); // ✅ Debugging
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("❌ Login Error:", error);
      throw error;
    }
  },

  logout: async () => {
    return instance
      .post(`${BASE_URL}/logout`)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response?.data || error.message;
      });
  },

  myProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found.");
    }
    return instance
      .get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error.response?.data || error.message;
      });
    },
   getCurrentUser : async (token) => {
  try {
    const response = await axios.get(
      "https://recipe-sharing-project-be.onrender.com/api/v1/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token
        },
      }
    );
    return response.data.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error.response ? error.response.data : { message: "Unknown error" };
  }
},
};

export default authServices;
