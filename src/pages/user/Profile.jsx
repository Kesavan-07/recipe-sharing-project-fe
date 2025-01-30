import React, { useState, useEffect } from "react";
import authServices from "../../services/authServices";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Ensure token is present
        if (!token) throw new Error("No token found. Please log in.");

        const response = await authServices.myProfile();

        // ✅ Validate response structure without throwing unnecessary errors
        if (response && response._id && response.username) {
          setUser(response); // ✅ Set valid user data
        } else {
          console.warn("Invalid profile data structure:", response);
          setError("Failed to load profile."); // ✅ Set meaningful error
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err.message || err);
        setError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false); // ✅ Ensure loading stops
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
    console.log("Selected file:", file); // ✅ Debugging
    setProfileImage(file);
  };

  const handleUpload = async () => {
    if (!profileImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", profileImage);

    try {
      const response = await axios.post(
        "https://recipe-sharing-project-be.onrender.com/api/v1/users/profile/upload", // Updated route
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message || "Profile picture updated successfully!");
      window.location.reload(); // ✅ Refresh page to show updated profile image
    } catch (err) {
      console.error(
        "Error uploading image:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Failed to upload profile picture.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>; // ✅ Display specific error message

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
      {user && (
        <div className="max-w-md mx-auto p-4 border rounded shadow-lg bg-white">
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"} // ✅ Placeholder for empty profile picture
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
          <h2 className="text-xl font-semibold text-center mt-2">
            {user.username}
          </h2>
          <p className="text-gray-600 text-center">{user.email}</p>
          <div className="mt-4">
            <input
              type="file"
              accept="image/*" // Restrict to images only
              onChange={handleFileChange}
            />
            <button
              onClick={handleUpload}
              className="block w-full mt-2 bg-gray-500 text-white p-2 rounded"
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
