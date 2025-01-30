import React, { useState, useEffect } from "react";
import authServices from "../../services/authServices";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await authServices.myProfile();
        if (response && response._id && response.username) {
          setUser(response);
          setFollowers(response.followers || []);
          setFollowing(response.following || []);
        } else {
          console.warn("Invalid profile data structure:", response);
          setError("Failed to load profile.");
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err.message || err);
        setError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await authServices.followUser(userId);
      alert("Followed successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error following user:", err.message || err);
      alert("Failed to follow user.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 Playwrite-IN-font">
        Profile
      </h1>
      {user && (
        <div className="max-w-md mx-auto p-4 border rounded shadow-lg bg-white">
          <img
            src={user.profilePicture || "/Images/ramsay.jpeg"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
          <h2 className="text-xl font-semibold text-center mt-2">
            {user.username}
          </h2>
          <p className="text-gray-600 text-center">{user.email}</p>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Followers</h3>
            <ul>
              {followers.map((follower) => (
                <li key={follower._id}>{follower.username}</li>
              ))}
            </ul>
            <h3 className="text-lg font-bold mt-4">Following</h3>
            <ul>
              {following.map((followed) => (
                <li key={followed._id}>{followed.username}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <button
              onClick={async () => {
                if (profileImage) {
                  const formData = new FormData();
                  formData.append("profilePicture", profileImage);
                  await authServices.uploadProfilePicture(formData);
                  alert("Profile updated successfully!");
                  window.location.reload();
                }
              }}
              className="block w-full mt-2 bg-gray-900 text-white p-2 rounded"
            >
              Upload Profile Picture
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
