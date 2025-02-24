import axios from "axios";

const API_BASE_URL = "https://recipe-sharing-project-be.onrender.com/api/v1";

const instance = axios.create({
  API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
