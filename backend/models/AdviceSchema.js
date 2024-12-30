const mongoose = require("mongoose");

const AdviceSchema = new mongoose.Schema({
    number: { type: Number, required: true },
  advice: { type: String, required: true }
});

const AdviceModel = mongoose.model("Advice", AdviceSchema);
module.exports = AdviceModel;
