import authServices from "../../services/authServices";

const authLoader = async () => {
  try {
    const userData = await authServices.myProfile();
    console.log("AuthLoader Response:", userData); // ✅ Debugging

    if (!userData) {
      console.warn("No user data received from API");
      throw new Error("User data is null or undefined"); // ✅ Ensure the error is handled properly
    }

    // Validate required fields
    if (!userData._id || !userData.username) {
      console.warn("Invalid user data structure:", userData);
      throw new Error("Invalid user data format"); // ✅ Force error if structure is incorrect
    }

    // Assign default role if missing
    if (!userData.role) {
      console.warn("User role is missing. Assigning default...");
      userData.role = "guest";
    }

    return userData; // ✅ Return valid user data
  } catch (error) {
    console.error("AuthLoader Error:", error.message || "Unknown error");
    return null; // ✅ Ensure failure is handled properly
  }
};

export default authLoader;
