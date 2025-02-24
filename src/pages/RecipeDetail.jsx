import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_BASEURL } from "../../utils";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getEmbedUrl = (url) => {
    const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASEURL}/recipes/${id}`, {
          withCredentials: true,
        });
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-center">{recipe.title}</h1>
      {/* Image */}
      <img
        src={recipe.image || "https://via.placeholder.com/300"}
        alt={recipe.title}
        className="w-full h-96 content-center object-cover rounded-lg mb-4"
      />
      {/* Cooking Time & Servings */}
      <p className="text-lg">
        <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
      </p>
      <p className="text-lg">
        <strong>Servings:</strong> {recipe.servings}
      </p>
      {/* Ingredients */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Ingredients</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-lg">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      {/* Video (if available) */}
      {recipe.videoFileUrl && (
        <div className="flex justify-center my-6">
          <div className="w-full max-w-xl aspect-video">
            <video controls className="w-full h-full rounded-lg">
              <source src={recipe.videoFileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {recipe.videoURL && (
        <div className="flex justify-center my-6">
          <iframe
            width="560"
            height="315"
            src={getEmbedUrl(recipe.videoURL)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Instructions</h2>
        <p className="text-lg leading-relaxed">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
