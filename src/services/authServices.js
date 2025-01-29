const BASE_URL = "https://recipe-sharing-project-be.onrender.com/api/v1/auth";

const authServices = {
  register: async (data) =>
    fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  login: async (data) =>
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  logout: async () =>
    fetch(`${BASE_URL}/logout`, {
      method: "POST",
    }),

  myProfile: async () => {
    const token = localStorage.getItem("token");
    return fetch(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default authServices;
