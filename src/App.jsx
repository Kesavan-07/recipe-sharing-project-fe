import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router";
import Layout from "./layouts/Layout";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./redux/features/auth/userSlice";

const App = () => {
  const user = useLoaderData(); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user)); 
    } else {
      dispatch(clearUser()); 
    }
  }, [user]);

  return (
    <Layout>
      <Outlet /> {/* Render the respective page or view based on routing */}
    </Layout>
  );
};

export default App;
