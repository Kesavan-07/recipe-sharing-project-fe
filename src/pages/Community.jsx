import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASEURL } from "./../../utils";
import { useSelector } from "react-redux";

const MembersList = () => {
  const userId = useSelector((store) => store.user._id);
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (activeTab === "all") fetchAllUsers();
    if (activeTab === "following") fetchFollowing();
    if (activeTab === "followers") fetchFollowers();
  }, [activeTab]);

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_BASEURL}/alluser`, {
        withCredentials: true,
      });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  // Fetch following list
  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_BASEURL}/following`, {
        withCredentials: true,
      });
      setFollowing(data || []);
    } catch (error) {
      console.error("Error fetching following users:", error);
    }
  };

  // Fetch followers list
  const fetchFollowers = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_BASEURL}/followers`, {
        withCredentials: true,
      });
      setFollowers(data || []);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  // Follow User API Call
  const followUser = async (id) => {
    try {
      await axios.post(
        `${BACKEND_BASEURL}/follow/${id}`,
        {},
        { withCredentials: true }
      );
      fetchFollowing();
      if (activeTab === "all") fetchAllUsers();
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  // Unfollow User API Call
  const unfollowUser = async (id) => {
    try {
      await axios.post(
        `${BACKEND_BASEURL}/unfollow/${id}`,
        {},
        { withCredentials: true }
      );
      fetchFollowing();
      if (activeTab === "all") fetchAllUsers();
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-bold mb-4">👥 Members</h2>

      {/* Tabs */}
      <div className="flex justify-around mb-6 border-b border-gray-600">
        {["all", "following", "followers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-lg font-semibold transition-all ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* User List Based on Active Tab */}
      <ul className="grid grid-cols-1 gap-4">
        {activeTab === "all" &&
          users.map((user) => (
            <li
              key={user._id}
              className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow-md"
            >
              <img
                src={
                  user.profilePicture ||
                  "https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                }
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover border border-gray-600"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              {userId !== user._id && (
                <button
                  onClick={() =>
                    following.some((f) => f._id === user._id)
                      ? unfollowUser(user._id)
                      : followUser(user._id)
                  }
                  className={`px-3 py-1 text-sm font-semibold rounded transition-all ${
                    following.some((f) => f._id === user._id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {following.some((f) => f._id === user._id)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </li>
          ))}

        {activeTab === "following" &&
          following.map((user) => (
            <li
              key={user._id}
              className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow-md"
            >
              <img
                src={
                  user.profilePicture ||
                  "https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                }
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover border border-gray-600"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={() => unfollowUser(user._id)}
                className="px-3 py-1 text-sm font-semibold rounded transition-all bg-red-500 hover:bg-red-600"
              >
                Unfollow
              </button>
            </li>
          ))}

        {activeTab === "followers" &&
          followers.map((user) => (
            <li
              key={user._id}
              className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow-md"
            >
              <img
                src={
                  user.profilePicture ||
                  "https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                }
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover border border-gray-600"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MembersList;
