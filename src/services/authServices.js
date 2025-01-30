import instance from "./instance";
import axios from "axios";

const API_BASE_URL = "https://recipe-sharing-project-be.onrender.com/api/v1/auth"; // ✅ Ensure this is defined

const authServices = {
  register: async (data) => {
    return instance
      .post(`${API_BASE_URL}/register`, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response?.data || error.message;
      });
  },

  login: async (data) => {
    try {
      const response = await instance.post(`${API_BASE_URL}/login`, data);
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
      .post(`${API_BASE_URL}/logout`)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response?.data || error.message;
      });
  },

  myProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No auth token found in localStorage");
        return null;
      }

      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Profile API Response:", response.data); // Debugging

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response?.data || error.message
      );
      return null;
    }
  },
  getCurrentUser: async (token) => {
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
