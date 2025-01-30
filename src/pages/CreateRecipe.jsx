import { useState } from "react";
import recipeServices from "../services/recipeServices";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState(1);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients.split(",")); // Convert string to array
    formData.append("instructions", instructions);
    formData.append("cookingTime", cookingTime);
    formData.append("servings", servings);
    formData.append("video", video);
    if (image) formData.append("image", image);

    try {
      await recipeServices.createRecipe(formData);
      alert("Recipe created successfully!");
      navigate("/"); // Redirect to home after success
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border mb-2"
        ></textarea>
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border mb-2"
        ></textarea>
        <input
          type="text"
          placeholder="Cooking Time (mins)"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <input
          type="number"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          className="w-full p-2 border mb-2"
        />

        <label>Upload Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border mb-2"
        />

        <label>YouTube Video URL (Optional):</label>
        <input
          type="text"
          placeholder="Video URL"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          className="w-full p-2 border mb-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
