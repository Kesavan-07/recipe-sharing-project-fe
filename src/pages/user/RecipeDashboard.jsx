import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASEURL } from "../../../utils";

const RecipeDashboard = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    servings: "",
    image: null,
    videoFileUrl: null,
    videoURL: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setRecipeData((prevData) => ({
      ...prevData,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const uploadFile = async (type) => {
    if (
      (type === "image" && !recipeData.image) ||
      (type === "video" && !recipeData.videoFileUrl)
    ) {
      return null;
    }

    const data = new FormData();
    data.append(
      "file",
      type === "image" ? recipeData.image : recipeData.videoFileUrl
    );
    data.append(
      "upload_preset",
      type === "image" ? "images_preset" : "videos_preset"
    );
    console.log(data);
    try {
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/dh0ryi7gp/${resourceType}/upload`;

      const res = await axios.post(api, data);
      console.log(`Uploaded ${type}:`, res.data.secure_url);
      return res.data.secure_url;
    } catch (error) {
      console.error(`Failed to upload ${type}:`, error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload image
      const imgUrl = recipeData.image ? await uploadFile("image") : null;
      if (recipeData.image && !imgUrl) {
        setError("Image upload failed. Please try again.");
        setLoading(false);
        return;
      }

      // Upload video file if provided
      const videoFileUrl = recipeData.videoFileUrl
        ? await uploadFile("video")
        : null;

      // Use video URL if provided, otherwise use uploaded file URL
      const videoUrl = recipeData.videoURL ? recipeData.videoURL : null;
      console.log(recipeData);
      const finalData = {
        title: recipeData.title,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        cookingTime: recipeData.cookingTime,
        servings: recipeData.servings,
        imgUrl,
        videoURL: videoUrl,
        videoFileUrl,
      };

      console.log("Final Recipe Data:", finalData);

      await axios.post(`${BACKEND_BASEURL}/createRecipe`, finalData, {
        withCredentials: true,
      });

      setRecipeData({
        title: "",
        ingredients: "",
        instructions: "",
        cookingTime: "",
        servings: "",
        image: null,
        videoFileUrl: null,
        videoURL: "",
      });

      console.log("Recipe Created Successfully!");
      setSuccess(true);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError("An error occurred while creating the recipe.");
      console.error("Submit Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-4 bg-white shadow-lg rounded-lg max-w-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Create a Recipe
      </h1>
      {success}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipeData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={recipeData.ingredients}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipeData.instructions}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <div className="flex gap-6">
          <input
            type="number"
            name="cookingTime"
            placeholder="Cooking Time (in minutes)"
            value={recipeData.cookingTime}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="servings"
            placeholder="Servings"
            value={recipeData.servings}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <label className="block font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100"
        />

        <label className="block font-medium text-gray-700">
          Upload Video (Optional)
        </label>
        <input
          type="file"
          name="videoFileUrl"
          accept="video/*"
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg bg-gray-100 ${
            recipeData.videoURL ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!!recipeData.videoURL}
        />

        <label className="block font-medium text-gray-700">
          Or Enter YouTube Video URL
        </label>
        <input
          type="text"
          name="videoURL"
          placeholder="YouTube Video URL"
          value={recipeData.videoURL}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg bg-gray-100 ${
            recipeData.videoFileUrl ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!!recipeData.videoFileUrl}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && (
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Recipe"}
          </button>
        )}
      </form>

      {loading && (
        <ThreeDots height="80" width="80" radius="9" color="#4fa94d" visible />
      )}
    </div>
  );
};

export default RecipeDashboard;
