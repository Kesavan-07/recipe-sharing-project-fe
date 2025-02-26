import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import authServices from "../services/authServices";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/features/auth/userSlice";
import Loader from "./Loader"; 
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

  const logoutUser = async () => {
    try {
      const response = await authServices.logout();

      if (response.status === 200) {
        toast.success(response.data.message);

        // Clear the user from Redux
        dispatch(clearUser());

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false); // Set loading to false after logout process
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <Loader /> // Show the loader while logging out
      ) : (
        <div>Logging Out...Please Wait...</div> // Show message if loading is false
      )}
    </div>
  );
};

export default Logout;
