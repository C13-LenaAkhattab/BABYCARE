const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: { type: [String], required: true },
});

const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;
