import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Layout from "./layouts/Layout";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/auth/userSlice";
import authServices from "./services/authServices";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await authServices.getCurrentUser();
        if (user) {
          dispatch(setUser(user));
        }
      }
    };

    restoreUser();
  }, [dispatch]);

  return (
    <Layout>
      <Outlet /> {/* Render the respective page or view based on routing */}
    </Layout>
  );
};

export default App;
