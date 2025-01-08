import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./style.css";
import { AppContext } from "../../App";

const Stage1 = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const containerRef = useRef(null);
  const { isLoggedIn, TokenState } = useContext(AppContext);

  const defaultRecipes = {
    1: {
      image: "https://www.healthylittlefoodies.com/wp-content/uploads/2020/05/carrot-puree.jpg"
    },
    2: {
      image: "https://media-cdn2.greatbritishchefs.com/media/cj5h5prc/img64258.whqc_1426x713q80.jpg"
    },
    3: {
      image: "https://weelicious.com/wp-content/uploads/2024/04/sweet-potato-puree-for-baby-500x500.webp"
    },
    4: {
      image: "https://www.healthylittlefoodies.com/wp-content/uploads/2019/02/apple-puree-bowl.jpg"
    },
    5: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2019/11/avocado-puree-in-white-bowl-with-baby-spoon.jpg"
    },
    6: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2020/09/pear-puree-in-white-bowl-with-spoon.jpg"
    },
    7: {
      image: "https://www.moobibaby.com/wp-content/uploads/2020/06/Untitled-design-18-e1591964851862.png"
    },
    8: {
      image: "https://www.simplyscratch.com/wp-content/uploads/2017/09/Homemade-Butternut-Squash-Pur%C3%A9e-l-SimplyScratch.com-14-1200x1798.jpg"
    },
    9: {
      image: "https://cdn.mos.cms.futurecdn.net/mWMW2CKvX4GZbqGR8Hv6sZ.jpg"
    },
    10: {
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pumpkin-puree-3.jpg"
    },
    11: {
      image: "https://www.eatingbirdfood.com/wp-content/uploads/2022/02/cropped-blueberry-puree-hero.jpg"
    },
    12: {
      image: "https://www.eatingbirdfood.com/wp-content/uploads/2022/01/mango-puree-spoon.jpg"
    },
    13: {
      image: "https://www.eatingbirdfood.com/wp-content/uploads/2021/07/peach-puree-silver-spoon.jpg"
    },
    14: {
      image: "https://pickyeaterblog.com/wp-content/uploads/2024/06/zucchini-baby-food-puree.jpg"
    },
    15: {
      image: "https://masandpas.com/wp-content/uploads/2019/02/Sweet-potato-puree-enjoy-this-sweet-potato-puree-with-coconut-oil-as-one-of-babys-first-foods-3-1440x960.jpg"
    },
    16: {
      image: "https://www.mummycooks.com/cdn/shop/articles/ezgif.com-webp-to-jpg_a54f7dcf-f211-4acf-8327-0041d6552b83.jpg?v=1518006718"
    },
    17: {
      image: "https://www.netmums.com/wp-content/uploads/netmums/2023/08/5f0edf7b-3940-44f8-9b5a-1101c0a864a8.jpg"
    },
    18: {
      image: "https://babyfoode.com/wp-content/uploads/2020/05/broccoli_baby_food_puree-15.jpg"
    },
    19: {
      image: "https://babyfoode.com/wp-content/uploads/2014/12/broccoli_greenbeans_apple_baby_food-S.jpg"
    },
    20: {
      image: "https://brooklynfarmgirl.com/wp-content/uploads/2018/12/Stage-3-Butternut-Squash-Baby-Food-8.jpg"
    },
    21: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2022/09/Beets-Baby-Food-6-horiz.jpg"
    },
    22: {
      image: "https://yummieliciouz.com/wp-content/uploads/2023/04/papaya-baby-food-recipe.png"
    },
    23: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2021/07/strawberry-puree.jpg"
    },
    24: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2020/01/kiwi-puree-in-white-bowl.jpg"
    },
    25: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2022/04/watermelon-for-baby-8-horiz.jpg"
    },
    26: {
      image: "https://carmyy.com/wp-content/uploads/2023/12/plum-puree-23.jpg"
    },
    27: {
      image: "https://babyfoode.com/wp-content/uploads/2023/08/cherries_for_baby-4.jpg"
    }
  };

  // Default  image if no matching recipe number is found
  const fallbackImage = "https://images.unsplash.com/photo-1495546968767-f0573cca821e?w=800&auto=format&fit=crop";

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/food/stage/1");
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
          <img src="images/cardio.png" alt="Stage 1 food" />
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
            <p>No recipes found for Stage 1.</p>
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

export default Stage1;