import React, { useState, useEffect } from "react";
import recipeServices from "../../services/recipeServices";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const RecipeDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipeServices.getAllRecipes();
        setRecipes(response.data);
      } catch (error) {
        toast.error("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Recipe Dashboard</h2>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="border rounded p-3 mb-3">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDashboard;
