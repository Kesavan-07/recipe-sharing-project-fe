import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoute = () => {
  const user = useSelector((store) => store.user);
  const isLogin = Boolean(user?._id);

  console.log("ProtectedRoute: User Data ->", user); // Debugging line

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
