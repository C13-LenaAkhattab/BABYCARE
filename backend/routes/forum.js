const express = require('express');
const forumRouter = express.Router();
const { postQuestion, postAnswer, getQuestions, getAnswers ,getUserQuestions,getUserAnswers} = require('../controllers/forum');
const authentication = require('../middleware/authentication');

forumRouter.post('/question', authentication, postQuestion);
forumRouter.post('/answer', authentication, postAnswer);

forumRouter.get('/questions', getQuestions);
forumRouter.get('/answers/:questionId', getAnswers); 

forumRouter.get('/my-questions', authentication, getUserQuestions); 
forumRouter.get('/my-answers', authentication, getUserAnswers); 


module.exports = forumRouter;
