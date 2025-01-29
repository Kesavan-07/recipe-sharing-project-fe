import axios from "axios";

const baseURL = "https://recipe-sharing-project-be.onrender.com";

const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;