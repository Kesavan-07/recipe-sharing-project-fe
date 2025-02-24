import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { removeUser } from "../redux/app/userSlice";
import { BACKEND_BASEURL } from "../../utils";
import axios from "axios";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
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
      <nav className="bg-white text-gray-800 p-4 flex items-center justify-between shadow-md px-12 z-10">
        <div className="flex items-center space-x-6 mt-2">
          <Link
            to="/"
            className="akaya-kanadaka-regular text-2xl hover:text-gray-500"
          >
            Food Tech
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
            </>
          )}
        </div>

        {/* Right Section */}
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

      <main className="flex-grow">{children}</main>
    </div>
  );
};

// ✅ PropTypes validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

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
