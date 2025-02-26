import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { removeUser } from "../redux/app/userSlice";
import { BACKEND_BASEURL } from "../../utils";
import axios from "axios";
import { searchRecipe } from "../redux/app/recipeSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const searchQuery = useSelector((store) => store.recipe.filter) || "";
  const isLogin = Boolean(user?._id);

  console.log("User is logged in:", isLogin);

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${BACKEND_BASEURL}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="bg-white text-gray-800 p-4 flex items-center justify-between shadow-md px-12 fixed w-full z-10">
        {/* Left Section: Brand & Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold hover:text-gray-500">
            Food Tech
          </Link>
          <Link to="/mealplanner" className="hover:text-gray-600 font-medium">
            Meal Planner
          </Link>
          {isLogin && (
            <>
              <Link
                to="/user/dashboard"
                className="hover:text-gray-600 font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/user/profile"
                className="hover:text-gray-600 font-medium"
              >
                Profile
              </Link>
              <Link
                to="/user/recipes"
                className="hover:text-gray-600 font-medium"
              >
                My Recipes
              </Link>
              <Link
                to="/user/community"
                className="hover:text-gray-600 font-medium"
              >
                Community
              </Link>
            </>
          )}
        </div>

        {/* Middle Section: Search Input */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-[450px] pl-12 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow shadow-sm hover:shadow-md"
            value={searchQuery}
            onChange={(e) => dispatch(searchRecipe(e.target.value))}
          />
          <div className="absolute left-4 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 17.5a7.5 7.5 0 006.15-3.85z"
              />
            </svg>
          </div>
        </div>

        {/* Right Section: Login/Logout Button */}
        <div>
          {!isLogin ? (
            <StyledLoginButton to="/login">
              <span className="text">Login</span>
              <span className="hover-text">boooo!!</span>
            </StyledLoginButton>
          ) : (
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow mt-20">{children}</main>
    </div>
  );
};

// ✅ PropTypes validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

// 🎨 Styled Login Button
const StyledLoginButton = styled(Link)`
  display: inline-block;
  position: relative;
  height: 3em;
  width: 8em;
  border: none;
  border-radius: 25px;
  background-color: #000;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;

  .text,
  .hover-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 2.5em;
    width: 6.5em;
    border-radius: 15px;
    color: white;
    line-height: 35px;
    font-size: 14px;
    letter-spacing: 1.5px;
    text-align: center;
    transition: opacity 0.3s ease-in-out;
  }

  .text {
    z-index: 1;
    opacity: 1;
  }

  .hover-text {
    z-index: 2;
    opacity: 0;
  }

  &:hover .text {
    opacity: 0;
  }

  &:hover .hover-text {
    opacity: 1;
  }
`;

export default Layout;
