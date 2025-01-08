import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./style.css";
import { AppContext } from "../../App";

const Stage3 = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const containerRef = useRef(null);
  const { isLoggedIn, TokenState } = useContext(AppContext);

  const defaultRecipes = {
    1: {
      image: "https://parentingperfect.com/wp-content/uploads/2023/03/what-does-toddler-food-look-like.jpg"
    },
    2: {
      image: "https://wholesomebabyfood.momtastic.com/images/3rdStageBabyFoodPicture.jpg"
    },
    3: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2022/09/Baby-Pancakes-in-stack-on-white-plate-with-fruit.jpg"
    },
    4: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2021/07/Baby-Cookies-in-stack-on-white-plate.jpg"
    },
    5: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2020/04/Baby-Muffins-on-white-plate.jpg"
    },
    6: {
      image: "https://babyfoode.com/wp-content/uploads/2019/08/finger_foods_9_months-14.jpg"
    },
    7: {
      image: "https://babyfoode.com/wp-content/uploads/2019/08/finger_foods_9_months-9.jpg"
    }
  };

  // Default image if no matching recipe number is found
  const fallbackImage = "https://images.unsplash.com/photo-1495546968767-f0573cca821e?w=800&auto=format&fit=crop";

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/food/stage/3");
        if (response.data.success) {
          const recipesWithImages = response.data.food.map((recipe, index) => ({
            ...recipe,
            image: defaultRecipes[index + 1]?.image || fallbackImage
          }));
          setRecipes(recipesWithImages);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error("Error fetching recipes: ", err);
        setRecipes(Object.values(defaultRecipes));
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const fetchComments = async (recipeId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/food/${recipeId}/comments`
      );
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments: ", err);
      if (err.response?.status === 404) {
        setComments([]);
      } else {
        setComments([]);
      }
    }
  };

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    fetchComments(recipe._id);
    setNewComment('');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = TokenState;
      
      const response = await axios.post(
        `http://localhost:5000/food/${selectedRecipe._id}/comments`, 
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        await fetchComments(selectedRecipe._id);
        setNewComment('');
      }
    } catch (err) {
      console.error("Error posting comment: ", err);
      if (err.response?.status === 401) {
        alert("Please login to comment");
      }
    }
  };

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="foodPage">
      <div className="RecipesSectionHeader">
        <h1>R E C I P E S F O R B A B I E S</h1>
        <p className="subtitle">Healthy, Homemade & Nutritious</p>
        <div className="header-divider"></div>
      </div>

      <div className="introSection">
        <div className="introCard">
          <h3>Why Homemade Baby Food?</h3>
          <p>Making your own baby food allows you to provide fresh, nutritious meals while knowing exactly what goes into your baby's diet.</p>
        </div>
        <div className="introCard">
          <h3>Getting Started</h3>
          <p>All you need is fresh ingredients, basic kitchen tools, and about 30 minutes to prepare nutritious homemade baby food.</p>
        </div>
        <div className="introCard">
          <h3>Storage Tips</h3>
          <p>Store purées in small portions in the refrigerator for 48 hours or freeze for up to 3 months.</p>
        </div>
      </div>

      <div className="Stage1InfoContainer">
        <div className="Stage1Info">
          <h2>Stage Three:</h2>
          <p>
            Between 8-10 months, your baby has likely mastered Stage 2 foods and is ready for more advanced textures. 
            They should be able to move food from side to side in their mouth and may have started developing their pincer grasp.
          </p>
          <p>
            At this stage, you can begin introducing small, soft pieces of food that dissolve easily. This helps baby develop 
            their chewing skills and hand-eye coordination. Finger foods are becoming increasingly important as your baby learns 
            to self-feed.
          </p>
          <p>
            Remember that gagging is different from choking - it's a natural reflex that helps prevent choking. However, always 
            supervise meals and ensure food pieces are appropriately sized.
          </p>
          <h4>Things You'll Need:</h4>
          <ul>
            <li>High chair</li>
            <li>Sippy cup</li>
            <li>Small bowls</li>
          </ul>
        </div>
        <div className="Stage1Image">
          <img src="images/pumpkin.png" alt="Stage 3 food" />
        </div>
      </div>

      <div className="RecipesNavigation">
        <button 
          className="nav-arrow prev" 
          onClick={() => handleScroll('left')}
        >
          ←
        </button>
        <button 
          className="nav-arrow next" 
          onClick={() => handleScroll('right')}
        >
          →
        </button>
        <div className="RecipesContainer" ref={containerRef}>
          {loading ? (
            <p>Loading recipes...</p>
          ) : recipes.length > 0 ? (
            recipes.map((recipe, i) => (
              <div
                key={i}
                className="RecipeCard"
                data-number={i + 1}
                onClick={() => handleCardClick(recipe)}
                data-bs-toggle="modal"
                data-bs-target="#recipeModal"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="RecipeImage"
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
                <h3>{recipe.name}</h3>
              </div>
            ))
          ) : (
            <p>No recipes found for Stage 3.</p>
          )}
        </div>
      </div>

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
              <img
                src={selectedRecipe?.image}
                alt={selectedRecipe?.name}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h1 className="modal-title">{selectedRecipe?.name}</h1>
              <p>{selectedRecipe?.description}</p>
              
              <h4 className="ingredients">Ingredients</h4>
              <ul>
                {selectedRecipe?.ingredients?.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>

              <h4 className="benefits">Benefits</h4>
              <ul>
                {selectedRecipe?.benefits?.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>

              <h4 className="recipe">Recipe Steps</h4>
              <ul>
                {selectedRecipe?.recipe?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>

              <h4 className="comments">Comments</h4>
              <div className="comments-section">
                {comments.length > 0 ? (
                  <div className="comments-list">
                    {comments.map((comment, idx) => (
                      <div key={idx} className="comment">
                        <strong>{comment.commenter?.firstName || 'Anonymous'}:</strong> {comment.comment}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No comments yet.</p>
                )}

                {isLoggedIn ? (
                  <form onSubmit={handleCommentSubmit} className="comment-form">
                    <div className="form-group">
                      <textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                    <button type="submit" className="comment-submit">
                      Add Comment
                    </button>
                  </form>
                ) : (
                  <div className="login-prompt">
                    Please login to add comments
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage3;