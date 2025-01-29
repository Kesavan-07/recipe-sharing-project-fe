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
    return instance
      .post(`${BASE_URL}/login`, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response?.data || error.message;
      });
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
};

export default authServices;
