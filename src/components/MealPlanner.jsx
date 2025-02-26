// import { useState, useEffect } from "react";
// import PropTypes from "prop-types"; // Import PropTypes
// import recipeServices from "../services/recipeServices";

// const MealPlanner = ({ recipes }) => {
//   const [selectedRecipes, setSelectedRecipes] = useState([]);
//   const [mealPlan, setMealPlan] = useState([]); // State for fetched meal plans
//   const [error, setError] = useState(null); // State for error handling

//   useEffect(() => {
//     // Fetch saved meal plans from backend
//     async function fetchMealPlans() {
//       try {
//         const plans = await recipeServices.getMealPlans();
//         setMealPlan(plans.length ? plans[0].recipes : []); // Set meal plans if available
//       } catch (error) {
//         console.error("Error fetching meal plans:", error);
//         setError("Failed to fetch meal plans. Please try again."); // Set error message
//       }
//     }
//     fetchMealPlans();
//   }, []);

//   const addRecipeToMealPlan = (recipe) => {
//     setSelectedRecipes([...selectedRecipes, recipe]);
//   };

//   const removeRecipeFromMealPlan = (recipeId) => {
//     setSelectedRecipes(selectedRecipes.filter((r) => r._id !== recipeId));
//   };

//   const saveMealPlan = async () => {
//     try {
//       await recipeServices.saveMealPlan(selectedRecipes.map((r) => r._id));
//       setMealPlan(selectedRecipes); // Update meal plan with selected recipes
//       alert("Meal plan saved successfully!");
//     } catch (error) {
//       console.error("Error saving meal plan:", error);
//       setError("Failed to save meal plan. Please try again."); // Set error message
//     }
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-bold mb-4">Meal Planner</h2>
//       {error && <p className="text-red-500">{error}</p>}{" "}
//       {/* Display error message */}
//       {/* Display fetched meal plans */}
//       <h3 className="text-lg font-bold mt-6">Fetched Meal Plans</h3>
//       <ul>
//         {mealPlan.length > 0 ? (
//           mealPlan.map((recipe) => (
//             <li key={recipe._id} className="flex justify-between p-2 border">
//               {recipe.title}
//             </li>
//           ))
//         ) : (
//           <p>No meal plans available.</p>
//         )}
//       </ul>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {recipes.map((recipe) => (
//           <div key={recipe._id} className="border p-4 rounded">
//             <h3 className="text-lg font-bold">{recipe.title}</h3>
//             <button
//               onClick={() => addRecipeToMealPlan(recipe)}
//               className="mt-2 bg-blue-500 text-white p-2 rounded"
//             >
//               Add to Meal Plan
//             </button>
//           </div>
//         ))}
//       </div>
//       {/* Selected Recipes */}
//       <h3 className="text-lg font-bold mt-6">Selected Recipes</h3>
//       <ul>
//         {selectedRecipes.map((recipe) => (
//           <li key={recipe._id} className="flex justify-between p-2 border">
//             {recipe.title}
//             <button
//               onClick={() => removeRecipeFromMealPlan(recipe._id)}
//               className="bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button
//         onClick={saveMealPlan}
//         className="mt-4 bg-green-500 text-white p-2 rounded"
//       >
//         Save Meal Plan
//       </button>
//     </div>
//   );
// };

// // Prop validation
// MealPlanner.propTypes = {
//   recipes: PropTypes.array.isRequired, // Ensure recipes is an array and is required
// };

// export default MealPlanner;
