const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            answer: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const ForumModel = mongoose.model("Forum", ForumSchema);
module.exports = ForumModel;
