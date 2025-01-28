import { useEffect } from "react";
import { toast } from "react-toastify";
import authServices from "../services/authServices";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/features/auth/userSlice";

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = async () => {
        try {
            const response = await authServices.logout();

            if (response.status === 200) {
                toast.success(response.data.message);

                // clear the user from redux
                dispatch(clearUser());

                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 1000);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        logoutUser();
    }, []);

    return (
        <div>Logging Out...Please Wait...</div>
    )
}

export default Logout;