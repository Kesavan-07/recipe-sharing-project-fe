import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (searchTerm) {
      const response = await fetch(`/api/recipes?search=${searchTerm}`);
      const data = await response.json();
      setRecipes(data);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Recipes</h1>
      <input
        type="text"
        placeholder="Search by ingredients or recipe name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default SearchPage;
