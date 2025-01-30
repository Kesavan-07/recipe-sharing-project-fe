import React, { useState, useEffect } from "react";
import authServices from "../services/authServices";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await authServices.myProfile();
      setUser(data);
      setProfilePic(data.profilePic || "");
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    // TODO: Implement image upload logic to backend
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <img
        src={profilePic || "https://via.placeholder.com/100"}
        alt="Profile"
        className="w-20 h-20 rounded-full"
      />
      <input type="file" onChange={handleImageUpload} />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
