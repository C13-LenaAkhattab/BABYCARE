import React, { useState, useEffect } from "react";
import axios from "axios";

const Stage2 = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/food/stage/2");
        if (response.data.success) {
          setRecipes(response.data.food);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error("Error fetching recipes: ", err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="RecipesContainer">
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        recipes.map((recipe, i) => (
          <div key={i} className="RecipeCard">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Benefits:</strong> {recipe.benefits}</p>
          </div>
        ))
      ) : (
        <p>No recipes found for Stage 2.</p>
      )}
    </div>
  );
};

export default Stage2;
