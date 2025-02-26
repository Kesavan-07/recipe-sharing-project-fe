import authServices from "../../services/authServices";

const authLoader = async () => {
 try {
   const userData = await authServices.myProfile();
   console.log("AuthLoader Response:", userData);

   if (!userData) {
     console.warn("No user data received from API");
     throw new Error("User is not authenticated");
   }

   return userData; // ✅ Return valid user data
 } catch (error) {
   console.error("AuthLoader Error:", error.message || "Unknown error");
   localStorage.removeItem("token"); // ✅ Ensure invalid token is removed
   return null; // Prevents crashing
 }
};

export default authLoader;
