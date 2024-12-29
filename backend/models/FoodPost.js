const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name:{ type: String, required: true },
 ingredients: { type: [String], required: true },
 benefits: { type: [String], required: true },
  recipe: { type: [String], required: true },
  description: { type: String, required: true },
  stage: { type: Number, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const FoodModel = mongoose.model("Food", FoodSchema);
module.exports = FoodModel;
