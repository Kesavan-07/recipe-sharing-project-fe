import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Layout from "./layouts/Layout";
import { BACKEND_BASEURL } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./redux/app/userSlice";
import axios from "axios";
const App = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const profile = async () => {
    if (Object.keys(user).length <= 0) {
      console.log("no user");
      try {
        const userProfile = await axios.get(BACKEND_BASEURL + "/profile", {
          withCredentials: true,
        });
        console.log(userProfile.data.user);
        dispatch(addUser(userProfile.data.user));
        console.log(Object.keys(user).length > 0);
      } catch (error) {
        navigate("/login");
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    profile();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Outlet /> {/* Render the respective page or view based on routing */}
    </Layout>
  );
};

export default App;
