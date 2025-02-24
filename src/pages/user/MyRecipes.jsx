import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASEURL } from "../../../utils";
import { useNavigate } from "react-router";
import Card from "../../components/Card";

const MyRecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASEURL}/myRecipes`, {
          withCredentials: true,
        });
        setRecipes(response.data); // Assuming response.data is an array of recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchMyRecipes();
  }, [refresh]);
  const DeleteRecipeHandler = async (id) => {
    await axios.delete(BACKEND_BASEURL + "/myRecipes/" + id, {
      withCredentials: true,
    });
    setrefresh(!refresh);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4  ">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Card
            key={recipe._id}
            recipe={recipe}
            MyRecipe={true}
            deleteRecipe={DeleteRecipeHandler}
          ></Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}
    </div>
  );
};

export default MyRecipes;
