import instance from "./instance";

const authServices = {
  register: async (data) => {
    return await instance.post("/api/v1/auth/register", data);
  },
  login: async (data) => {
    return await instance.post("/api/v1/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
  },
  logout: async () => {
    return await instance.post("/api/v1/auth/logout");
  },
  me: async () => {
    return await instance.get("/api/v1/auth/myprofile");
  },
};

export default authServices;
