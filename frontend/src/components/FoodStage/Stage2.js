import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const Stage2 = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comments, setComments] = useState([]);

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
    <div className="foodPage">
      <div className="Stage1InfoContainer">
        <div className="Stage1Info">
          <h2>Stage Two:</h2>
          <p>
          At roughly 6-8 months old, baby will begin to sit up on their own. This may not fully develop for some time, 
          but you'll see them make attempts.It can be anywhere from 2-3 months after starting solids, depending on when you started.

          </p>
          <p>
          During this time, they'll largely eat easy-to-swallow foods like mashed carrots. Remember, it can take up 
          to 15 times of baby eating something before they like it, so don't give up on food if at first they seem 
          uninterested. You can now also start to offer more foods at one time.
          </p>
          <p>
          You can also begin to let them hold the spoon and help you bring it to their mouth.
          </p>
          <h4>Things You'll Need:</h4>
          <ul>
            <li> Silicone feeder </li>
            <li>Plates</li>
          </ul>
        </div>
        <div className="Stage1Image">
          <img src="images/broccoli.png" alt="Stage 2 food" />
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
          <p>No recipes found for Stage 2.</p>
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

              <h4>Comments:</h4>
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <div key={idx}>
                    <strong>{comment.username}:</strong> {comment.text}
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
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

export default Stage2;