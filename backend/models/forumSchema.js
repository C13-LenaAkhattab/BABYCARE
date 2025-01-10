const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    answers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
            answer: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model("Forum", ForumSchema);
