import authServices from "../../services/authServices";

const authLoader = async () => {
  try {
    const userData = await authServices.myProfile();
    console.log("AuthLoader Response:", userData); // Debugging

    if (!userData) {
      console.warn("No user data received from API");
      return null;
    }

    // Validate required fields
    if (!userData._id || !userData.username) {
      console.warn("Invalid user data structure:", userData);
      return null;
    }

    // Assign default role if missing
    if (!userData.role) {
      console.warn("User role is missing. Assigning default...");
      userData.role = "guest";
    }

    return userData;
  } catch (error) {
    console.error("AuthLoader Error:", error.message || "Unknown error");
    return null;
  }
};

export default authLoader;
