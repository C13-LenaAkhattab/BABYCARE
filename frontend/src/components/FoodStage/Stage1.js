import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const Stage1 = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); 
  const [comments, setComments] = useState([]); 

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/food/stage/1");
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

  const fetchComments = async (recipeId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/food/comments/${recipeId}`
      );
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments: ", err);
      setComments([]);
    }
  };

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    fetchComments(recipe._id);
  };

  return (
    <div>
      <div className="Stage1InfoContainer">
        <div className="Stage1Info">
          <h2>Stage One:</h2>
          <p>
            To reach the first stages of solid feeding, baby should be able to
            hold their head up on their own. While this is roughly anywhere from
            4-6 months old, baby should be at least 4 months before starting on
            any solids.
          </p>
          <p>
            You'll also notice that their tongue thrust, or the pushing of food
            out of their mouth with their tongue, has largely stopped. This
            means their swallowing capabilities have developed and they're ready
            to try some first tastes!
          </p>
          <p>
            During this time, introduce baby to as many new foods as possible,
            every 3-5 days, so you can tell if they have any food sensitivities
            early on.
          </p>
          <h4>Things You'll Need:</h4>
          <ul>
            <li>Baby spoons</li>
            <li>Bowl with lid</li>
          </ul>
        </div>
        <div className="Stage1Image">
          <img src="images/pear.png" alt="Stage 1 food" />
        </div>
      </div>

      {/* Recipes Section */}
      <div className="RecipesContainer">
        {loading ? (
          <p>Loading recipes...</p>
        ) : recipes.length > 0 ? (
          recipes.map((recipe, i) => (
            <div
              key={i}
              className="RecipeCard"
              onClick={() => handleCardClick(recipe)}
              data-bs-toggle="modal"
              data-bs-target="#recipeModal"
            >
              <img
                src={`images/${recipe.image || "default.png"}`}
                alt={recipe.name}
                className="RecipeImage"
              />
              <h3>{recipe.name}</h3>
            </div>
          ))
        ) : (
          <p>No recipes found for Stage 1.</p>
        )}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="recipeModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="recipeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="recipeModalLabel">
                {selectedRecipe?.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{selectedRecipe?.description}</p>
              <h4>Ingredients:</h4>
              <ul>
                {selectedRecipe?.ingredients?.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
              <h4>Benefits:</h4>
              <ul>
                {selectedRecipe?.benefits?.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
              <h4>Recipe:</h4>
              <ul>
                {selectedRecipe?.recipe?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>

              {/* Comments Section */}
              <h4>Comments:</h4>
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <div key={idx}>
                    <strong>{comment.username}:</strong> {comment.text}
                  </div>
                ))
              ) : (
                <p>No comments available.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage1;
