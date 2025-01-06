import React, { useContext } from 'react';
import { AppContext } from '../../App';

const FoodCategory = () => {
    
  const { setCategoryName ,CategoryName } = useContext(AppContext);  
  
  const categories = [
    {
      name: "Stage 1"
    },
    {
      name: "Stage 2"
    },
    {
      name: "Stage 3"
    }
  ];

  return (
    <>
      <div className="CategoryPage">Baby Food Recipes</div>
      
      <div className="CategoriesContainer">
        {categories.map((category, i) => {
          return (
            <button
              key={i}
              className="Category"
              onClick={() => {
                setCategoryName(category.name);  
              }}
            >
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default FoodCategory;
