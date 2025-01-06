import React, { useContext } from 'react';
import { AppContext } from '../../App';
import "./style.css"

const FoodCategory = () => {
    
  const { setCategoryName ,CategoryName } = useContext(AppContext);  
  
  const categories = [
    {
      name: "Stage 1",
      note: "4-6 monthes"
    },
    {
      name: "Stage 2",
      note: "6-8 monthes"
    },
    {
      name: "Stage 3",
      note: "8-12 monthes"
    }
  ];

  return (
    <>
      <div className="CategoryPage">Choose the stage Based on your baby's age:</div>
      
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
              <h1>{category.name}</h1>
              <h4>{category.note}</h4>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default FoodCategory;
