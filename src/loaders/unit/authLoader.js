import authServices from "../../services/authServices";

const authLoader = async () => {
  try {
    // Call the service to get the current user's profile
    const response = await authServices.myProfile();
    console.log("AuthLoader Response:", response.data); // Debugging

    // Validate the response structure
    if (!response.data || !response.data._id || !response.data.username) {
      console.warn("Invalid user data received:", response.data);
      return null;
    }

    // Handle the case where 'role' is missing
    if (!response.data.role) {
      console.warn("User data is missing 'role' field. Assigning default...");
      response.data.role = "guest"; // Example default value
    }

    // Return the valid user data
    return response.data;
  } catch (error) {
    // Handle errors gracefully
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error("AuthLoader Error:", errorMessage);

    // Optionally rethrow the error if you want to propagate it to the caller
    return null;
  }
};

export default authLoader;
