import React, { useState, useEffect } from "react";
import API from "../../api";
import { MessageCircle, Send, User, Calendar, Eye, EyeOff } from "lucide-react";

const ForumPage = () => {
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("community");

    const fetchPosts = async () => {
        try {
            const res = await API.get("/forum/questions");
            setPosts(res.data.questions);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };

    const fetchMyPosts = async () => {
        try {
            const res = await API.get("/forum/my-questions");
            setMyPosts(res.data.questions);
        } catch (err) {
            console.error("Error fetching user's posts:", err);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/forum/question", { 
                question: newPost,
                isAnonymous: isAnonymous 
            });
            setNewPost("");
            setIsAnonymous(false);
            fetchPosts();
            fetchMyPosts();
            setMessage("Post shared successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("Failed to share post. Please try again.");
        }
    };

    const handleAnswerSubmit = async (postId) => {
        if (!newAnswer.trim()) return;
        
        try {
            await API.post("/forum/answer", {
                questionId: postId,
                answer: newAnswer,
                isAnonymous: isAnonymous
            });
            setNewAnswer("");
            setIsAnonymous(false);
            fetchPosts();
            setMessage("Response shared successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("Failed to share response. Please try again.");
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchMyPosts();
    }, []);

    const PostCard = ({ post }) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div style={{ backgroundColor: 'var(--color-fourth)', padding: '1.5rem', borderBottom: '1px solid var(--color-third)' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div style={{ backgroundColor: 'var(--color-first)', padding: '0.5rem 1rem' }} className="rounded-full flex items-center gap-2">
                            <User size={16} className="text-gray-600" />
                            <span className="text-sm font-medium">
                                {post.isAnonymous ? "Anonymous" : (post.userId?.firstName || "User")}
                            </span>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-first)', padding: '0.5rem 1rem' }} className="rounded-full flex items-center gap-2">
                            <Calendar size={16} className="text-gray-600" />
                            <span className="text-sm font-medium">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
                <p className="text-lg text-gray-800 mb-4">{post.question}</p>
            </div>

            {/* Answers Section */}
            <div className="p-6">
                <div className="space-y-4">
                    {post.answers?.map((answer) => (
                        <div key={answer._id} style={{ backgroundColor: 'var(--color-fourth)' }} className="rounded-lg p-4">
                            <p className="text-gray-700 mb-3">{answer.answer}</p>
                            <div className="flex items-center gap-2">
                                <span style={{ backgroundColor: 'var(--color-first)' }} className="text-sm px-3 py-1 rounded-full">
                                    {answer.isAnonymous ? "Anonymous" : (answer.user?.firstName || "User")}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {new Date(answer.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Answer Form */}
                <div className="mt-6">
                    <div className="mb-4">
                        <textarea
                            placeholder="Share your thoughts or advice..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            style={{ backgroundColor: 'var(--color-first)' }}
                            className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2 min-h-24 resize-none"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            {isAnonymous ? <EyeOff size={20} /> : <Eye size={20} />}
                            <span>{isAnonymous ? "Post Anonymously" : "Post with Name"}</span>
                        </button>
                        <button
                            onClick={() => handleAnswerSubmit(post._id)}
                            style={{ backgroundColor: 'var(--color-third)' }}
                            className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90"
                        >
                            <Send size={18} />
                            Share Response
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: 'var(--color-first)', minHeight: '100vh' }} className="py-8">
            <style>
                {`
                    :root {
                        --color-first: #f9ecec;
                        --color-second: #f0d9da;
                        --color-third: #c8d9eb;
                        --color-fourth: #ecf2f9;
                    }
                `}
            </style>
            
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Forum</h1>
                    <p className="text-gray-600">Share your thoughts and experiences</p>
                </div>

                {message && (
                    <div style={{ backgroundColor: 'var(--color-third)' }} 
                         className="mb-6 px-4 py-3 rounded-lg text-center">
                        {message}
                    </div>
                )}

                {/* Post Creation Form */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div style={{ backgroundColor: 'var(--color-second)' }} className="p-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <MessageCircle size={24} />
                            Create a Post
                        </h2>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handlePostSubmit}>
                            <textarea
                                placeholder="What's on your mind?"
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                style={{ backgroundColor: 'var(--color-fourth)' }}
                                className="w-full p-4 rounded-lg border mb-4 min-h-32 resize-none focus:outline-none focus:ring-2"
                                required
                            />
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => setIsAnonymous(!isAnonymous)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    {isAnonymous ? <EyeOff size={20} /> : <Eye size={20} />}
                                    <span>{isAnonymous ? "Post Anonymously" : "Post with Name"}</span>
                                </button>
                                <button
                                    type="submit"
                                    style={{ backgroundColor: 'var(--color-third)' }}
                                    className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90"
                                >
                                    <Send size={20} />
                                    Share Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                    <div className="grid grid-cols-2">
                        <button
                            onClick={() => setActiveTab("community")}
                            style={{ 
                                backgroundColor: activeTab === "community" ? 'var(--color-third)' : 'var(--color-fourth)'
                            }}
                            className="py-3 font-medium transition-colors"
                        >
                            Community Posts
                        </button>
                        <button
                            onClick={() => setActiveTab("my-posts")}
                            style={{ 
                                backgroundColor: activeTab === "my-posts" ? 'var(--color-third)' : 'var(--color-fourth)'
                            }}
                            className="py-3 font-medium transition-colors"
                        >
                            My Posts
                        </button>
                    </div>
                </div>

                {/* Posts List */}
                <div>
                    {activeTab === "community" 
                        ? posts.map(post => <PostCard key={post._id} post={post} />)
                        : myPosts.map(post => <PostCard key={post._id} post={post} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default ForumPage;