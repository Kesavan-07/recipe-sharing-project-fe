import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { BACKEND_BASEURL } from "../../../utils";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
    phoneNumber: "",
    website: "",
    birthday: "",
    profilePicture: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASEURL}/profile`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setPreviewImage(response.data.user.profilePicture);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);
  console.log(user);
  const validateInput = (name, value) => {
    let error = "";
    if (name === "phoneNumber" && !/^\d{10}$/.test(value)) {
      error = "Phone number must be 10 digits.";
    }
    if (
      name === "website" &&
      value &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)
    ) {
      error = "Enter a valid website URL.";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setUser((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (Object.values(errors).some((err) => err)) {
      alert("Please fix the validation errors.");
      setLoading(false);
      return;
    }

    let imageUrl = user.profilePicture;

    if (user.profilePicture instanceof File) {
      try {
        const newdata = new FormData();
        newdata.append("file", user.profilePicture);
        newdata.append("upload_preset", "images_preset");

        const api = `https://api.cloudinary.com/v1_1/dh0ryi7gp/image/upload`;
        const res = await axios.post(api, newdata);

        imageUrl = res.data.secure_url;
        console.log("Uploaded Image URL:", imageUrl);
      } catch (error) {
        console.error("Failed to upload image:", error);
        alert("Image upload failed. Try again.");
        setLoading(false);
        return;
      }
    }

    const updatedUser = { ...user, profilePicture: imageUrl };

    try {
      await axios.put(`${BACKEND_BASEURL}/profile`, updatedUser, {
        withCredentials: true,
      });

      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

      <div className="flex justify-center mb-4">
        <label htmlFor="profilePicture" className="cursor-pointer">
          <img
            src={
              previewImage ||
              "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain"
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
          />
        </label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={user.username ?? ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email ?? ""}
            className="w-full p-2 border rounded-md bg-gray-100"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={user.bio ?? ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="Write something about yourself..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={user.location ?? ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="Your city, country"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={user.phoneNumber ?? ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter 10-digit phone number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Website</label>
          <input
            type="text"
            name="website"
            value={user.website ?? ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="Your personal website or social media link"
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">{errors.website}</p>
          )}
        </div>
        {loading ? (
          <button
            type="button"
            disabled
            className="w-full bg-gray-300 text-white p-2 rounded-md mb-4 cursor-not-allowed"
          >
            Saving...
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => navigate("/change-password")}
              className="w-full bg-gray-500 text-white p-2 rounded-md mb-4 hover:bg-gray-600"
            >
              Change Password
            </button>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </>
        )}
      </form>
      {loading && (
        <ThreeDots height="80" width="80" radius="9" color="#4fa94d" visible />
      )}
    </div>
  );
};

export default Profile;
