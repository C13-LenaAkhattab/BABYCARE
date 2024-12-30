const ForumModel=require("../models/forumSchema")

const postQuestion = (req, res) => {
    const { question } = req.body;
    const newQuestion = new ForumModel({
        question,
    });

    newQuestion
        .save()
        .then(savedQuestion => {
            res.status(201).json({
                success: true,
                message: "Question posted successfully.",
                question: savedQuestion,
            });
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: `Failed to post question: ${error.message}`,
            });
        });
};

const postAnswer = (req, res) => {
    const { questionId, answer } = req.body;
    const userId = req.token.id;

    ForumModel.findById(questionId)
        .then(question => {
            if (!question) {
                return res.status(404).json({
                    success: false,
                    message: "Question not found.",
                });
            }

            question.answers.push({ userId, answer });
            return question.save();
        })
        .then(updatedQuestion => {
            res.status(200).json({
                success: true,
                message: "Answer posted successfully.",
                question: updatedQuestion,
            });
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: `Failed to post answer: ${error.message}`,
            });
        });
};

module.exports = { postQuestion, postAnswer };