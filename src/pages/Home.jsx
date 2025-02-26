import React, { useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const Home = () => {
  const [openComments, setOpenComments] = useState(null);

  // Fetch recipes and filter query from Redux
  const allRecipes = useSelector((store) => store.recipe.allrecipe[0]) || [];
  const searchQuery = useSelector((store) => store.recipe.filter) || "";
  const loading = useSelector((store) => store.recipe.loading);
  const error = useSelector((store) => store.recipe.error);

  console.log(allRecipes);

  const setfunction = (res) => {
    console.log(res);
    setOpenComments(res);
  };

  // 🔍 **Filter recipes based on the search query (Name + Ingredients)**
  const filteredRecipes = searchQuery
    ? allRecipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Match by name
          recipe.ingredients?.some(
            (ingredient) =>
              ingredient.toLowerCase().includes(searchQuery.toLowerCase()) // Match by ingredients
          )
      )
    : allRecipes;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <Card
            key={recipe._id}
            recipe={recipe}
            actionBtn={true}
            setfunction={setfunction}
            openComments={openComments}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}
    </div>
  );
};

export default Home;
