import React, { useState } from "react";
import recipeServices from "../../services/recipeServices";
import { useNavigate } from "react-router-dom";
import SuccessNotification from "../../components/SuccessNotification";

const RecipeDashboard = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    servings: "",
    image: null, // Updated to support file uploads
    video: null, // Optional: Added for video uploads
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  setRecipeData({
    ...recipeData,
    [name]: name === "image" ? files[0] : value, // Handle file uploads
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Create FormData for file uploads
    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("instructions", recipeData.instructions);
    formData.append("cookingTime", recipeData.cookingTime);
    formData.append("servings", recipeData.servings);
    if (recipeData.image) formData.append("image", recipeData.image);
    if (recipeData.video) formData.append("video", recipeData.video);

    try {
      await recipeServices.createRecipe(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setRecipeData({
        title: "",
        ingredients: "",
        instructions: "",
        cookingTime: "",
        servings: "",
        image: null,
        video: null,
      });
      navigate("/"); // Redirect to Home
    } catch (err) {
      setError("Failed to create recipe.");
      console.error("❌ Error creating recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 Playwrite-IN-font">
        Create a Recipe
      </h1>

      {/* ✅ Success Notification */}
      {success && <SuccessNotification onClose={() => setSuccess(false)} />}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipeData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={recipeData.ingredients}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipeData.instructions}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="cookingTime"
          placeholder="Cooking Time (in minutes)"
          value={recipeData.cookingTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          value={recipeData.servings}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-black text-white rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
};

export default RecipeDashboard;
