import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import recipeServices from "../services/recipeServices";
import { toast } from "react-toastify";

const RecipeForm = () => {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    servings: "",
    image: null,
    videoFile: null, // New: For video file upload
    videoURL: "", // New: For YouTube link
  });

  const handleChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setRecipeData({ ...recipeData, image: e.target.files[0] });
  };

  const handleVideoFileChange = (e) => {
    setRecipeData({ ...recipeData, videoFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered");

    if (!recipeData.title || !recipeData.ingredients || !recipeData.steps) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("steps", recipeData.steps);
    formData.append("cookingTime", recipeData.cookingTime);
    formData.append("servings", recipeData.servings);
    if (recipeData.image) {
      formData.append("image", recipeData.image);
    }
    if (recipeData.videoFile) {
      formData.append("video", recipeData.videoFile);
    } else if (recipeData.videoURL) {
      formData.append("video", recipeData.videoURL);
    }

    try {
      await recipeServices.createRecipe(formData);
      toast.success("Recipe submitted successfully!");
      navigate("/recipes"); // Redirect to recipe list
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast.error("Failed to submit recipe. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Submit a Recipe</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipeData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={recipeData.ingredients}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        ></textarea>
        <textarea
          name="steps"
          placeholder="Preparation Steps"
          value={recipeData.steps}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        ></textarea>
        <input
          type="number"
          name="cookingTime"
          placeholder="Cooking Time (minutes)"
          value={recipeData.cookingTime}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          value={recipeData.servings}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />

        {/* Image Upload */}
        <label className="block font-medium">Upload Recipe Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-2"
        />

        {/* Video Upload OR YouTube Link */}
        <label className="block font-medium">Upload Video (Optional):</label>
        <input
          type="file"
          name="videoFile"
          accept="video/*"
          onChange={handleVideoFileChange}
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-medium">Or Enter YouTube Video URL:</label>
        <input
          type="text"
          name="videoURL"
          placeholder="YouTube Video URL"
          value={recipeData.videoURL}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
