const express = require('express');
const forumRouter = express.Router();
const { postQuestion, postAnswer } = require('../controllers/forum');
const authentication = require('../middleware/authentication');

forumRouter.post('/question', authentication, postQuestion); 
forumRouter.post('/answer', authentication, postAnswer);    

module.exports = forumRouter;
