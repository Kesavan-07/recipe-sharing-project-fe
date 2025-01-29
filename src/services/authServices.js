import instance from "./instance";

const authServices = {
  register: async (data) => {
    return await instance.post("/api/v1/register", data);
  },
  login: async (data) => {
    return await instance.post("/api/v1/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  logout: async () => {
    return await instance.post("/api/v1/logout");
  },
  myprofile: async () => {
    const token = localStorage.getItem("token"); 
    return await instance.get("/api/v1/myprofile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default authServices;
