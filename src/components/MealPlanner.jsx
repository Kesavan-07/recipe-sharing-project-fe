import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaShareAlt, FaList, FaDownload } from "react-icons/fa";

const ItemType = { RECIPE: "recipe" };

const RecipeItem = ({ recipe }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.RECIPE,
    item: recipe,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border rounded bg-white shadow-md cursor-pointer flex items-center gap-2 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <img
        src={recipe.image || "https://via.placeholder.com/50"}
        alt={recipe.title}
        className="w-12 h-12 rounded object-cover"
      />
      <span>{recipe.title}</span>
    </div>
  );
};

const MealSlot = ({ day, mealType, recipes, setMealPlan }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.RECIPE,
    drop: (item) => {
      setMealPlan((prev) => ({
        ...prev,
        [day]: { ...prev[day], [mealType]: [...prev[day][mealType], item] },
      }));
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 border rounded min-h-[100px] ${
        isOver ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      <h3 className="font-semibold text-sm">{mealType}</h3>
      {recipes.map((r, index) => (
        <div key={index} className="flex items-center gap-2 mt-1">
          <img
            src={r.image}
            alt={r.title}
            className="w-10 h-10 rounded object-cover"
          />
          <p className="text-xs text-gray-700">{r.title}</p>
        </div>
      ))}
    </div>
  );
};

const MealPlanner = () => {
  const recipes = useSelector((store) => store.recipe.allrecipe[0]) || [];
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  const [mealPlan, setMealPlan] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { Breakfast: [], Lunch: [], Dinner: [] },
      }),
      {}
    )
  );

  // const shareRecipe = () => {
  //   const recipeUrl = `${window.location.origin}/recipes/${recipe._id}`;
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: recipe.title,
  //         text: "Check out this amazing recipe!",
  //         url: recipeUrl,
  //       })
  //       .then(() => console.log("Recipe shared successfully"))
  //       .catch((error) => console.error("Error sharing recipe:", error));
  //   } else {
  //     navigator.clipboard.writeText(recipeUrl);
  //     alert("Recipe link copied to clipboard!");
  //   }
  // };
  // const shareMealPlan = () => {
  //   const mealData = daysOfWeek
  //     .map(
  //       (day) =>
  //         `${day}: ${mealTypes.map(
  //           (meal) =>
  //             `\n${meal}: ${mealPlan[day][meal].map((r) => r.title).join(", ")}`
  //         )}`
  //     )
  //     .join("\n\n");

  //   const text = encodeURIComponent(`🍽️ My Weekly Meal Plan:\n${mealData}`);
  //   window.open(`https://wa.me/?text=${text}`, "_blank");
  // };

  const shareMealPlan = () => {
    const mealData = daysOfWeek
      .map(
        (day) =>
          `${day}: ${mealTypes
            .map(
              (meal) =>
                `\n${meal}: ${mealPlan[day][meal]
                  .map((r) => r.title)
                  .join(", ")}`
            )
            .join("")}`
      )
      .join("\n\n");

    const text = `🍽️ My Weekly Meal Plan:\n${mealData}`;
    const encodedText = encodeURIComponent(text.replace(/\n/g, "%20")); // Replace new lines for WhatsApp
    const currentUrl = encodeURIComponent(window.location.href);

    if (navigator.share) {
      // Web Share API for mobile devices
      navigator
        .share({
          title: "My Weekly Meal Plan",
          text: text,
          // url: currentUrl,
        })
        .then(() => console.log("Meal plan shared successfully"))
        .catch((error) => console.error("Error sharing meal plan:", error));
    } else {
      // Social media share URLs
      const socialMediaLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${currentUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        telegram: `https://t.me/share/url?url=${currentUrl}&text=${encodedText}`,
      };

      // Prompt user to choose a platform
      const platform = prompt(
        "Choose a platform to share:\n1. WhatsApp\n2. X (Twitter)\n3. Facebook\n4. Telegram\n5. Instagram (Copy to clipboard)",
        "1"
      );

      switch (platform) {
        case "1":
          window.open(socialMediaLinks.whatsapp, "_blank");
          break;
        case "2":
          window.open(socialMediaLinks.twitter, "_blank");
          break;
        case "3":
          window.open(socialMediaLinks.facebook, "_blank");
          break;
        case "4":
          window.open(socialMediaLinks.telegram, "_blank");
          break;
        case "5":
          navigator.clipboard.writeText(text);
          alert(
            "Meal plan copied! Open Instagram and paste it in a post or story."
          );
          break;
        default:
          alert("Invalid option. Try again.");
      }
    }
  };

  const downloadMealPlan = () => {
    const mealData = daysOfWeek
      .map(
        (day) =>
          `${day}: ${mealTypes.map(
            (meal) =>
              `\n${meal}: ${mealPlan[day][meal].map((r) => r.title).join(", ")}`
          )}`
      )
      .join("\n\n");

    const blob = new Blob([mealData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "meal-plan.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateShoppingList = () => {
    const shoppingList = {};

    daysOfWeek.forEach((day) => {
      mealTypes.forEach((meal) => {
        mealPlan[day][meal].forEach((recipe) => {
          if (recipe.ingredients) {
            recipe.ingredients.forEach((ingredient) => {
              if (shoppingList[ingredient]) {
                shoppingList[ingredient] += 1;
              } else {
                shoppingList[ingredient] = 1;
              }
            });
          }
        });
      });
    });

    return shoppingList;
  };

  const downloadShoppingList = () => {
    const shoppingList = generateShoppingList();

    if (!Object.keys(shoppingList).length) {
      alert("Your shopping list is empty!");
      return;
    }

    // Generate table headers
    let shoppingText = "🛒 Shopping List\n\n";
    shoppingText += "Ingredient                  |Quantity \n";
    shoppingText += "----------------------------|-------------\n";

    // Format ingredients into table rows
    Object.entries(shoppingList).forEach(([item, count]) => {
      shoppingText += `${item.padEnd(25, " ")} | ${count}\n `;
    });

    shoppingText += "----------------------------|-------------\n";

    // Create a text file blob
    const blob = new Blob([shoppingText], { type: "text/plain" });

    // Create a downloadable link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shopping-list.txt";
    document.body.appendChild(link);
    link.click();

    // Cleanup: Remove the link element after triggering the download
    document.body.removeChild(link);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-5 relative">
        <h2 className="text-xl font-bold mb-4 text-center">
          Weekly Meal Planner
        </h2>
        <div className="grid grid-cols-1  gap-4">
          <div className="sticky">
            <h3 className="font-semibold mb-2">Available Recipes</h3>
            <div className="flex flex-wrap gap-2 sticky">
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <RecipeItem key={recipe._id} recipe={recipe} />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No recipes available.
                </p>
              )}
            </div>
          </div>

          <div className="overflow-x-auto h-[450px]">
            <table className="w-full border-collapse border table-fixed">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border w-1/6">Day</th>
                  {mealTypes.map((meal) => (
                    <th key={meal} className="p-2 border w-1/4">
                      {meal}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {daysOfWeek.map((day) => (
                  <tr key={day} className="border">
                    <td className="p-2 border font-bold text-center">{day}</td>
                    {mealTypes.map((mealType) => (
                      <td key={mealType} className="p-2 border">
                        <MealSlot
                          day={day}
                          mealType={mealType}
                          recipes={mealPlan[day][mealType]}
                          setMealPlan={setMealPlan}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={shareMealPlan}
          >
            <FaShareAlt /> Share Plan
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={downloadMealPlan}
          >
            <FaDownload /> Download Plan
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={downloadShoppingList}
          >
            <FaList /> Shopping List
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default MealPlanner;
