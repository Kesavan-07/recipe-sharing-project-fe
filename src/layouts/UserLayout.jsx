import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../redux/features/auth/userSlice";
import authServices from "../services/authServices";

const UserLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authServices.me();
        dispatch(setUser(response.data)); // Update Redux state
      } catch (error) {
        console.error("User fetch failed:", error);
      }
    };

    if (!user) fetchUser();
  }, [dispatch, user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-white">
      {" "}
      {/* Changed background to white */}
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">User Panel</h2>
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-medium"
              : "text-white font-medium hover:text-gray-400"
          }
        >
          📊 Dashboard
        </NavLink>
        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-medium"
              : "text-white font-medium hover:text-gray-400"
          }
        >
          👤 Profile
        </NavLink>
        <NavLink
          to="/user/recipes"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-medium"
              : "text-white font-medium hover:text-gray-400"
          }
        >
          🍽 My Recipes
        </NavLink>
      </aside>
      {/* Main Content */}
      <main className="flex-grow p-6">
        <Outlet /> {/* Renders nested routes */}
      </main>
    </div>
  );
};

export default UserLayout;
