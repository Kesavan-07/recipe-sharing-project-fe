import React from "react";
import { Navigate, Outlet, useLoaderData } from "react-router";

const UserLayout = () => {
  const user = useLoaderData(); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Outlet /> {/* Renders nested routes */}
    </div>
  );
};

export default UserLayout;
