import authServices from "../../services/authServices";

const authLoader = async () => {
  try {
    const response = await authServices.myProfile();
    console.log("AuthLoader Response:", response.data); // Debugging

    // Check if the user data is valid
    if (!response.data || !response.data._id || !response.data.username) {
      console.warn("Invalid user data received:", response.data);
      return null;
    }

    // If 'role' is missing, handle the situation accordingly
    if (!response.data.role) {
      console.warn("User data is missing 'role' field, but proceeding...");
      // Optionally, set a default role or handle as needed
      response.data.role = "guest"; // Example default value
    }

    return response.data;
  } catch (error) {
    console.error("AuthLoader Error:", error.response?.data || error.message);
    return null;
  }
};

export default authLoader;
