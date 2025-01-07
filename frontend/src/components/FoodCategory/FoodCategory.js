import React, { useState } from "react";
import Stage1 from "../FoodStage/Stage1";
import Stage2 from "../FoodStage/Stage2";
import Stage3 from "../FoodStage/Stage3";
import "./style.css";
import { useNavigate } from "react-router-dom";


const FoodCategory = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const navigate=useNavigate()

  const categories = [
    {
      name: "Stage one",
      note: "4-6 months",
      image: "images/pear.png",
    },
    {
      name: "Stage two",
      note: "6-8 months",
      image: "images/broccoli.png",
    },
    {
      name: "Stage three",
      note: "8-12 months",
      image: "images/aubergine.png",
    },
  ];

  return (
    <>
      <div className="CategoryPage">Choose the stage based on your baby's age:</div>

      <div className="CategoriesContainer">
        {categories.map((category, i) => (
          <div
            key={i}
            className="Category"
            onClick={() => {
              setSelectedStage(category.name);
            }}
          >
            <img src={category.image} alt={`${category.name} icon`} />
            <h1>{category.name}</h1>
            <h4>{category.note}</h4>
          </div>
        ))}
      </div>

      {selectedStage === "Stage one" && navigate("/Stage1")}
      {selectedStage === "Stage two" && navigate("/Stage2")}
      {selectedStage === "Stage three" && navigate("/Stage3")}
    </>
  );
};

export default FoodCategory;
