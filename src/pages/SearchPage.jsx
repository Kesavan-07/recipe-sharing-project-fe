import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounce state

  // Debounce effect to delay API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // Wait for 500ms after typing

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedSearch) {
        try {
          const response = await fetch(
            `/api/recipes?search=${debouncedSearch}`
          );
          const data = await response.json();
          setRecipes(data);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      } else {
        setRecipes([]); 
      }
    };

    handleSearch();
  }, [debouncedSearch]); 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Recipes</h1>

      {/* Search Input with Icon & Button */}
      <div className="flex items-center border p-2 rounded mb-4 w-full">
        <input
          type="text"
          placeholder="Search by ingredients or recipe name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 outline-none"
        />
        <button
          className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
          onClick={() => setDebouncedSearch(searchTerm)}
        >
          🔍 {/* Unicode search icon */}
        </button>
      </div>

      <RecipeList recipes={recipes} />
    </div>
  );
};

export default SearchPage;
