import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { selectUser } from "../redux/features/auth/userSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          {!user && (
            <Link to="/register" className="mr-4">
              Register
            </Link>
          )}
          {!user && (
            <Link to="/login" className="mr-4">
              Login
            </Link>
          )}
          {user && (
            <>
              <Link to="/user/dashboard" className="mr-4">
                Dashboard
              </Link>
              <Link to="/user/profile" className="mr-4">
                Profile
              </Link>
              <Link to="/user/recipes" className="mr-4">
                My Recipes
              </Link>
            </>
          )}
        </div>
        <div>
          {user && (
            <button
              className="bg-red-500 px-3 py-1 rounded"
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

export default Layout;
