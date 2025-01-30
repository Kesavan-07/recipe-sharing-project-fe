import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authServices from "../../services/authServices";
import { updateProfile } from "../../redux/features/auth/userSlice";
import axios from "axios";
import Button from "../../components/Button";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", bio: "" });

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
          setFormData({
            name: response.name,
            email: response.email,
            bio: response.bio || "",
          });
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateProfile(formData));
    setEditMode(false);
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
          {!editMode ? (
            <>
              <h2 className="text-xl font-semibold text-center mt-2">
                {user.username}
              </h2>
              <p className="text-gray-600 text-center">{user.email}</p>
              <p className="text-gray-600 text-center">
                {user.bio || "No bio available"}
              </p>
              <Button className="mt-3" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <input
                className="w-full p-2 border rounded"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="w-full p-2 border rounded mt-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <textarea
                className="w-full p-2 border rounded mt-2"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
              <Button className="mt-3" onClick={handleUpdate}>
                Save
              </Button>
            </>
          )}
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
            <Button
              className="block w-full mt-2 bg-gray-900 text-white p-2 rounded"
              onClick={async () => {
                if (profileImage) {
                  const formData = new FormData();
                  formData.append("profilePicture", profileImage);
                  await authServices.uploadProfilePicture(formData);
                  alert("Profile updated successfully!");
                  window.location.reload();
                }
              }}
            >
              Upload Profile Picture
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
