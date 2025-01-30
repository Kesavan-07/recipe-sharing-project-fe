import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectUser } from "../redux/features/auth/userSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-md px-12 z-10">
        {/* Left Links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-600 font-medium">
            Home
          </Link>
          {user && (
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
          {!user && (
            <StyledLoginButton to="/login">
              <span className="text">Login</span>
              <span className="hover-text">Sign Up</span>
            </StyledLoginButton>
          )}
          {user && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={() => navigate("/logout", { replace: true })}
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

const StyledLoginButton = styled(Link)`
  display: inline-block;
  position: relative;
  height: 3em;
  width: 8em;
  border: none;
  border-radius: 25px;
  background-color: #000; /* Login and Sign Up same color */
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
    opacity: 1; /* Show Login initially */
  }

  .hover-text {
    z-index: 2;
    opacity: 0; /* Hide Sign Up initially */
  }

  &:hover .text {
    opacity: 0; /* Hide Login on hover */
  }

  &:hover .hover-text {
    opacity: 1; /* Show Sign Up on hover */
  }
`;

export default Layout;
