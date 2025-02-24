import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/app/userSlice";
import { BACKEND_BASEURL } from "../../utils";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmail] = useState("jojo@gmail.com");
  const [password, setPassword] = useState("Ghost123#");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandle = () => {
    setIsSignup(!isSignup);
    setEmail("");
    setPassword("");
    setName("");
  };

  const formHandler = async () => {
    setLoading(true);
    setError("");

    try {
      const endpoint = isSignup ? "/signup" : "/login";
      const payload = isSignup
        ? { username: name, email: emailId, password }
        : { email: emailId, password };

      const response = await axios.post(BACKEND_BASEURL + endpoint, payload, {
        withCredentials: true,
      });

      if (response.data?.user) {
        dispatch(addUser(response.data.user));
        if (!isSignup) {
          navigate("/");
        }
      } else {
        setError("Invalid email or password.");
      }

      // Clear form fields after signup
      if (isSignup) {
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 transition-transform transform hover:scale-105">
        <h2 className="text-center text-2xl font-bold text-gray-700">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          {isSignup
            ? "Join us and explore amazing features!"
            : "Login to continue your journey!"}
        </p>

        {isSignup && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="mt-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={emailId}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={formHandler}
          className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 flex justify-center"
          disabled={loading}
        >
          {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => changeHandle()}
              className="ml-1 text-blue-500 hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
