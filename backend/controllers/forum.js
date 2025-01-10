const ForumModel = require("../models/forumSchema");

const postQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        const userId = req.token.userId; 

        if (!question || typeof question !== "string" || question.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Question content is required and must be a non-empty string.",
            });
        }

        const newQuestion = new ForumModel({
            userId,
            question: question.trim(),
            createdAt: new Date(),
        });

        const savedQuestion = await newQuestion.save();

        return res.status(201).json({
            success: true,
            message: "Question posted successfully.",
            question: savedQuestion,
        });
    } catch (error) {
        console.error("Error in postQuestion:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to post question",
            error: error.message,
        });
    }
};

const postAnswer = async (req, res) => {
    try {
        const { questionId, answer } = req.body;
        const userId = req.token.userId;

        if (!answer || typeof answer !== "string" || answer.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Answer content is required and must be a non-empty string.",
            });
        }

        if (!questionId || typeof questionId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Valid questionId is required.",
            });
        }

        const question = await ForumModel.findById(questionId);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found.",
            });
        }

        question.answers.push({
            userId,
            answer: answer.trim(),
            createdAt: new Date(),
        });

        const updatedQuestion = await question.save();

        return res.status(200).json({
            success: true,
            message: "Answer posted successfully.",
            question: updatedQuestion,
        });
    } catch (error) {
        console.error("Error in postAnswer:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to post answer",
            error: error.message,
        });
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await ForumModel.find({})
            .populate("userId", "firstName lastName email") 
            .select("question createdAt userId") 
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Questions retrieved successfully.",
            questions,
        });
    } catch (error) {
        console.error("Error in getQuestions:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve questions",
            error: error.message,
        });
    }
};

const getAnswers = async (req, res) => {
    try {
        const { questionId } = req.params;

        if (!questionId || typeof questionId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Valid questionId is required.",
            });
        }

        const question = await ForumModel.findById(questionId)
            .populate("userId", "firstName lastName email") 
            .populate("answers.userId", "firstName lastName email") 
            .select("question answers");

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Answers retrieved successfully.",
            question,
        });
    } catch (error) {
        console.error("Error in getAnswers:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve answers",
            error: error.message,
        });
    }
};

const getUserQuestions = async (req, res) => {
    try {
        const userId = req.token.userId;

        const questions = await ForumModel.find({ userId })
            .populate("userId", "firstName lastName email") 
            .select("question createdAt userId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "User questions retrieved successfully.",
            questions,
        });
    } catch (error) {
        console.error("Error in getUserQuestions:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve user questions",
            error: error.message,
        });
    }
};

const getUserAnswers = async (req, res) => {
    try {
        const userId = req.token.userId;

        const questionsWithUserAnswers = await ForumModel.find(
            { "answers.userId": userId },
            "question answers"
        )
            .populate("userId", "firstName lastName email") 
            .populate("answers.userId", "firstName lastName email") 
            .lean();

        const userAnswers = questionsWithUserAnswers.map((question) => ({
            questionId: question._id,
            question: question.question,
            answers: question.answers.filter((ans) => ans.userId.toString() === userId),
        }));

        return res.status(200).json({
            success: true,
            message: "User answers retrieved successfully.",
            userAnswers,
        });
    } catch (error) {
        console.error("Error in getUserAnswers:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve user answers",
            error: error.message,
        });
    }
};

module.exports = {
    postQuestion,
    postAnswer,
    getQuestions,
    getAnswers,
    getUserQuestions,
    getUserAnswers,
};
