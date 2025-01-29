import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import recipeServices from "../../services/recipeServices";

const RecipeDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipeServices.getAllRecipes();
        setRecipes(response);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    try {
      const response = await recipeServices.createRecipe(newRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, response]);
      setNewRecipe({ title: "", description: "", image: "" });
    } catch (err) {
      console.error("Error creating recipe:", err);
      setError("Failed to create recipe.");
    }
  };

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Dashboard</h1>

      {/* Recipe Creation Form */}
      {isLoggedIn && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create a Recipe</h2>
          <form
            className="flex flex-col gap-4 p-4 border rounded bg-gray-100"
            onSubmit={handleCreateRecipe}
          >
            <input
              type="text"
              placeholder="Recipe Title"
              value={newRecipe.title}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, title: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={newRecipe.description}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, description: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newRecipe.image}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, image: e.target.value })
              }
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Recipe
            </button>
          </form>
        </div>
      )}

      {/* Recipe List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="p-4 border rounded shadow-md bg-white"
          >
            <img
              src={recipe.image || "https://via.placeholder.com/150"}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
            <p className="text-gray-600">
              {recipe.description
                ? recipe.description.substring(0, 100) + "..."
                : "No description available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDashboard;
