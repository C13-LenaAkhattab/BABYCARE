import { React, useState } from "react";
import axios from "axios";

const Food = () => {
  const [name, setName] = useState("");
  const [recipe,setRecipe]=useState("")
  const [ingredients,setIngredients]=useState("")
  const [description,setDescription]=useState("")
  const [stage,setStage]=useState("")
  const [benefits,setBenefits]=useState("")

  const FoodPost = () => {
    axios
      .post(`http://localhost:5000/food/create`, {
        name,
        recipe,
        ingredients,
        description,
        stage,
        benefits,
      })
      .then((res) => {
        setName(name)
        setRecipe(recipe)
        setIngredients(ingredients)
        setDescription(description)
        setStage(stage)
        setBenefits(benefits)
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
          setMessageType("error");
        } else {
          setMessage("An unexpected error occurred");
          setMessageType("error");
        }
      });
  };
};
return (
<>

</>
)

export default Food;
