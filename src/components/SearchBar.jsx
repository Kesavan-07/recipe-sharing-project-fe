import PropTypes from "prop-types"; 

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  dietaryRestrictions,
  setDietaryRestrictions,
  mealTypes,
  setMealTypes,
}) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDietaryChange = (e) => {
    setDietaryRestrictions(e.target.value);
  };

  const handleMealTypeChange = (e) => {
    setMealTypes(e.target.value);
  };

  return (
    <div className="flex flex-col mb-4">
      <input
        type="text"
        placeholder="Search by ingredients or recipe name"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded mb-2 w-full"
      />
      <select
        value={dietaryRestrictions} // Set value for controlled component
        onChange={handleDietaryChange}
        className="border p-2 rounded mb-2 w-full"
      >
        <option value="">Select Dietary Restrictions</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="keto">Keto</option>
      </select>
      <select
        value={mealTypes} // Set value for controlled component
        onChange={handleMealTypeChange}
        className="border p-2 rounded mb-2 w-full"
      >
        <option value="">Select Meal Type</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </select>
    </div>
  );
};

// Prop validation
SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired, // Ensure searchTerm is a required string
  setSearchTerm: PropTypes.func.isRequired, // Ensure setSearchTerm is a required function
  dietaryRestrictions: PropTypes.string.isRequired, // Ensure dietaryRestrictions is a required string
  setDietaryRestrictions: PropTypes.func.isRequired, // Ensure setDietaryRestrictions is a required function
  mealTypes: PropTypes.string.isRequired, // Ensure mealTypes is a required string
  setMealTypes: PropTypes.func.isRequired, // Ensure setMealTypes is a required function
};

export default SearchBar;
