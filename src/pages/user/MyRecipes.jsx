import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import recipeServices from "../../services/recipeServices";
import SuccessNotification from "../../components/SuccessNotification";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await recipeServices.getMyRecipes();
        setRecipes(response);
        setFilteredRecipes(response);
      } catch  {
        setError("Failed to load recipes.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  // ✅ Handle Delete Recipe
  const handleDelete = async (recipeId) => {
    try {
      await recipeServices.deleteRecipe(recipeId);
      const updatedRecipes = recipes.filter(
        (recipe) => recipe._id !== recipeId
      );
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to delete recipe.");
    }
  };

  // ✅ Handle Search Recipes
  useEffect(() => {
    if (searchTerm) {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchTerm, recipes]);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 Playwrite-IN-font">
        My Recipes
      </h1>

      {/* ✅ Search Input */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {success && <SuccessNotification onClose={() => setSuccess(false)} />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={recipe.image || "https://via.placeholder.com/150"}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-bold text-gray-800 mt-2">
              {recipe.title}
            </h2>
            <p className="text-sm text-gray-600">
              Cooking Time: {recipe.cookingTime} mins
            </p>
            <div className="flex justify-between mt-2">
              <Link to={`/recipe/${recipe._id}`} className="text-blue-500">
                View
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={() => handleDelete(recipe._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
