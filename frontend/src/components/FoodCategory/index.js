import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./style.css";

const FoodCategory = () => {
  const { setCategoryName } = useContext(AppContext);

  const categories = [
    {
      name: "Stage 1",
      note: "4-6 months",
      image: "images/pear.png", 
    },
    {
      name: "Stage 2",
      note: "6-8 months",
      image: "images/broccoli.png", 
    },
    {
      name: "Stage 3",
      note: "8-12 months",
      image: "images/aubergine.png", 
    },
  ];

  return (
    <>
      <div className="CategoryPage">Choose stage Based on your baby's age:</div>

      <div className="CategoriesContainer">
        {categories.map((category, i) => (
          <div
            key={i}
            className="Category"
            onClick={() => {
              setCategoryName(category.name);
            }}
          >
            <img src={category.image} alt={`${category.name} icon`} />
            <h1>{category.name}</h1>
            <h4>{category.note}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodCategory;