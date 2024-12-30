const mongoose = require("mongoose");

const BabySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  ageInMonths: {
    type: Number,
    required: true, 
    min: 0,  
    max:60 
  },
  parent: {
    type : mongoose.Schema.Types.ObjectId, 
    ref : "User"}
  
});

const BabyModel = mongoose.model("Baby", BabySchema);
module.exports = BabyModel;
