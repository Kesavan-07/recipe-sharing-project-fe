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
    image: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await recipeServices.createRecipe(recipeData);
      setSuccess(true); // ✅ Show success notification
      setTimeout(() => setSuccess(false), 5000); // ✅ Hide after 5s
      setRecipeData({
        title: "",
        ingredients: "",
        instructions: "",
        cookingTime: "",
        servings: "",
        image: "",
      });
      navigate("/"); // ✅ Redirect to Home after creating
    } catch (err) {
      setError("Failed to create recipe.");
      console.error("❌ Error creating recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Create a Recipe</h1>

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
          type="text"
          name="image"
          placeholder="Image URL"
          value={recipeData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-gray-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
};

export default RecipeDashboard;
