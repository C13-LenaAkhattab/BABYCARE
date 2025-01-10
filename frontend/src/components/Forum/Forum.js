import React, { useState, useEffect } from "react";
import API from "../../api";

const ForumPage = () => {
    const [questions, setQuestions] = useState([]);
    const [myQuestions, setMyQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("community");

    const fetchQuestions = async () => {
        try {
            const res = await API.get("/forum/questions");
            setQuestions(res.data.questions);
        } catch (err) {
            console.error("Error fetching questions:", err.response?.data?.message);
        }
    };

    const fetchMyQuestions = async () => {
        try {
            const res = await API.get("/forum/my-questions");
            setMyQuestions(res.data.questions);
        } catch (err) {
            console.error("Error fetching user's questions:", err.response?.data?.message);
        }
    };

    const handlePostQuestion = async (e) => {
        e.preventDefault();
        try {
            await API.post("/forum/question", { question: newQuestion });
            setNewQuestion("");
            fetchQuestions();
            fetchMyQuestions();
            setMessage("Question posted successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("Failed to post question. Please try again.");
        }
    };

    const handlePostAnswer = async (questionId) => {
        if (!newAnswer.trim()) return;
        
        try {
            await API.post("/forum/answer", {
                questionId: questionId,
                answer: newAnswer,
            });
            setNewAnswer("");
            fetchQuestions();
            setMessage("Answer posted successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("Failed to post answer. Please try again.");
        }
    };

    useEffect(() => {
        fetchQuestions();
        fetchMyQuestions();
    }, []);

    const QuestionCard = ({ question, showAnswerForm = true }) => (
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            <div className="bg-[#f0d9da] p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-600 bg-[#f9ecec] px-3 py-1 rounded-full">
                                {question.userId?.firstName || "Anonymous"} • {new Date(question.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-[#ecf2f9]">
                {question.answers?.length > 0 && (
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 flex items-center">
                            <span className="bg-[#c8d9eb] px-3 py-1 rounded-full text-sm">
                                {question.answers.length} Answers
                            </span>
                        </h4>
                        <div className="space-y-3">
                            {question.answers.map((answer) => (
                                <div key={answer._id} className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-700">{answer.answer}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-xs bg-[#f9ecec] px-2 py-1 rounded-full text-gray-600">
                                            {answer.user?.firstName || "Anonymous"}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(answer.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {showAnswerForm && (
                    <div className="mt-6 bg-white p-4 rounded-lg">
                        <textarea
                            placeholder="Share your experience or advice..."
                            className="w-full min-h-24 p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#c8d9eb] bg-[#f9ecec]"
                            value={selectedQuestionId === question._id ? newAnswer : ""}
                            onChange={(e) => {
                                setSelectedQuestionId(question._id);
                                setNewAnswer(e.target.value);
                            }}
                        />
                        <button 
                            onClick={() => handlePostAnswer(question._id)}
                            className="w-full bg-[#c8d9eb] text-gray-700 py-2 px-4 rounded-lg hover:bg-[#f0d9da] transition-colors font-medium"
                        >
                            Share Your Answer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f9ecec] py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Parents Helping Parents</h1>
                    <p className="text-gray-600">Join our supportive community of parents sharing experiences and advice</p>
                </div>
                
                {message && (
                    <div className="bg-[#c8d9eb] border border-[#f0d9da] text-gray-700 px-4 py-3 rounded-lg mb-4">
                        {message}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
                    <div className="bg-[#f0d9da] p-4">
                        <h2 className="text-lg font-semibold text-gray-800">Ask the Community</h2>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handlePostQuestion} className="space-y-4">
                            <textarea
                                placeholder="What's your parenting question or experience you'd like to share?"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                className="w-full min-h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8d9eb] bg-[#ecf2f9]"
                                required
                            />
                            <button 
                                type="submit" 
                                className="w-full bg-[#c8d9eb] text-gray-700 py-3 px-4 rounded-lg hover:bg-[#f0d9da] transition-colors font-medium"
                            >
                                Post Your Question
                            </button>
                        </form>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                    <div className="flex">
                        <button
                            className={`flex-1 px-6 py-3 font-medium transition-colors ${
                                activeTab === "community"
                                    ? "bg-[#c8d9eb] text-gray-700"
                                    : "bg-[#ecf2f9] text-gray-500 hover:bg-[#f0d9da]"
                            }`}
                            onClick={() => setActiveTab("community")}
                        >
                            Community Questions
                        </button>
                        <button
                            className={`flex-1 px-6 py-3 font-medium transition-colors ${
                                activeTab === "my-questions"
                                    ? "bg-[#c8d9eb] text-gray-700"
                                    : "bg-[#ecf2f9] text-gray-500 hover:bg-[#f0d9da]"
                            }`}
                            onClick={() => setActiveTab("my-questions")}
                        >
                            My Questions
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {activeTab === "community" && 
                        questions.map((question) => (
                            <QuestionCard key={question._id} question={question} />
                        ))
                    }
                    {activeTab === "my-questions" && 
                        myQuestions.map((question) => (
                            <QuestionCard key={question._id} question={question} showAnswerForm={false} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ForumPage;