import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPassword,
  setEmail,
  setName,
  setPassword,
} from "../redux/features/auth/registerSlice";
import { toast } from "react-toastify";
import authServices from "../services/authServices";
import { useNavigate } from "react-router";

const Register = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    toast.success("Registering...");

    try {
      const response = await authServices.register({ name, email, password });

      if (response.status === 201) {
        toast.success("Registered successfully!");

        // Clear the form
        dispatch(setName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        // Redirect to the login page
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Register</h2>
      <form className="flex flex-col space-y-3" onSubmit={handleRegister}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <button className="bg-blue-500 text-white py-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
