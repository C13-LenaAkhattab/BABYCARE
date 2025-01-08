import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./style.css";
import { AppContext } from "../../App";

const Stage2 = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const containerRef = useRef(null);
  const { isLoggedIn, TokenState } = useContext(AppContext);

  const defaultRecipes = {
    1: {
      image: "https://babyfoode.com/wp-content/uploads/2017/04/spinach_apple_baby_food-7.jpg"
    },
    2: {
      image: "https://raisingveggielovers.com/wp-content/uploads/2020/06/peanut-butter-banana-oatmeal.jpg"
    },
    3: {
      image: "https://www.annabelkarmel.com/wp-content/uploads/2022/01/Curried-Sweet-Potato-Lentil-Puree-scaled.jpg"
    },
    4: {
      image: "https://www.dessertfortwo.com/wp-content/uploads/2016/02/homemade-baby-food-chicken-2.jpg"
    },
    5: {
      image: "https://masandpas.com/wp-content/uploads/2018/11/no-cook-baby-puree-with-blueberries-bananas-and-soft-ripe-pears-1-1440x960.jpg"
    },
    6: {
      image: "https://www.buonapappa.net/wp-content/uploads/2018/04/yolk-avo-puree2.jpg"
    },
    7: {
      image: "https://images.getrecipekit.com/v1622949798_Chickpea_Pumpkin_Quinoa_Puree_v326uj.jpg?aspect_ratio=1:1&quality=90"
    },
    8: {
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/banana-and-avocado-puree-afda0ac.jpg"
    },
    9: {
      image: "https://www.jennahelwig.com/wp-content/uploads/2019/04/Roast-Vegetables-e1555688242402.jpg"
    },
    10: {
      image: "https://www.egginfo.co.uk/sites/default/files/styles/amp_1200x900_4_3/public/2020/07/babys-first-scrambled-egg_0.jpg?itok=OoGJZNRK"
    },
    11: {
      image: "https://www.mjandhungryman.com/wp-content/uploads/2024/02/Easy-mini-pancakes.jpg"
    },
    12: {
      image: "https://babyfoode.com/wp-content/uploads/2019/04/easy_peasy_5_veggie_pasta_baby-1-500x375.jpg"
    },
    13: {
      image: "https://babyjourney.se/wp-content/uploads/2024/08/058023ab-9bd8-47a6-9a9b-55e84906f083-plockmat-300x225.png"
    },
    14: {
      image: "https://www.organix.com/sites/hero_organix/files/2023-06/10_Banner%20-%20Organix%20-%20Recipe%20-%20Savoury%20Vegetable%20Muffins_%20Main_10%20Months_Static%20Image_Website_1080px%20by%201080px_2023_1.jpg"
    },
    15: {
      image: "https://www.hauteandhealthyliving.com/wp-content/uploads/2022/03/baby-led-weaning-chicken-avocado-poppers-8.jpg"
    },
    16: {
      image: "https://www.foxandbriar.com/wp-content/uploads/2019/06/Sweet-potato-black-bean-patties-for-babies-and-toddlers-3-of-6-500x500.jpg"
    },
    17: {
      image: "https://www.eatingbirdfood.com/wp-content/uploads/2020/11/oatmeal-for-babies-500x500.jpg"
    },
    18: {
      image: "https://www.mjandhungryman.com/wp-content/uploads/2022/02/pear-hummus-for-babies.jpg"
    },
    19: {
      image: "https://www.easybabymeals.com/wp-content/uploads/2014/12/IMGP2322.DNG_.jpg"
    },
    20: {
      image: "https://www.organix.com/sites/hero_organix/files/inline-images/Carousel%20-%20Organix%20-%20Recipe%20-%20Crispy%20Cauliflower%20and%20Broccoli%20Bites_Step%201_10%20Months_Static%20Image_Website_1200px%20by%20800px_2023.jpg"
    },
    21: {
      image: "https://www.aldi.com.au/fileadmin/fm-dam/images/Recipes/Recipe_Images_PD/ALC7496_PD_Banana-_-Coconut-Milk-Pops.jpg"
    },
    22: {
      image: "https://www.theorganicplace.com.au/wp-content/uploads/2018/07/Carrot-Patties-The-Organic-Place.jpg"
    },
    23: {
      image: "https://onmykidsplate.com/wp-content/uploads/2019/12/Cucumber-Hummus-Appetizers-1.jpg"
    },
    24: {
      image: "https://www.yummytoddlerfood.com/wp-content/uploads/2022/10/Turkey-Meatballs-8-horiz.jpg"
    },
    25: {
      image: "https://mykidslickthebowl.com/wp-content/uploads/2024/08/baked-pears-14-1024x1024.jpg"
    },
    26: {
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijNOhteccCWk70nBgH1fpppDNwSL-bFfpCvqIle4gtVG0uuwtBGH5Ly2hSi892ofCnmATHhJgkKIiffjcemG85l8QX7z04Sx6X5rPjDvkwpMsG65PuWCfJ6G1rJHmJ-Ig3adaz6WiF5gTY/s1600/22323769_10159306319420316_1587777902_o.jpg"
    },
    27: {
      image: "https://i0.wp.com/erinpalinski.com/wp-content/uploads/2021/01/Avocado-egg-salad-recipe-pureed-baby-food.jpg?resize=1200%2C962&ssl=1"
    }
  };

  const fallbackImage = "https://images.unsplash.com/photo-1495546968767-f0573cca821e?w=800&auto=format&fit=crop";

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/food/stage/2");
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
          <h2>Stage Two:</h2>
          <p>
            At roughly 6-8 months old, baby will begin to sit up on their own. This may not fully develop for some time, 
            but you'll see them make attempts. It can be anywhere from 2-3 months after starting solids, depending on when you started.
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
            <li>Silicone feeder</li>
            <li>Plates</li>
          </ul>
        </div>
        <div className="Stage1Image">
          <img src="images/vegetable.png" alt="Stage 2 food" />
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
            <p>No recipes found for Stage 2.</p>
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

export default Stage2;