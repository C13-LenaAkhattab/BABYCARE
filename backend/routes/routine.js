const express = require('express');
const routineRouter = express.Router();
const { addRoutine, getRoutine } = require('../controllers/routine');
const authentication = require('../middleware/authentication');

routineRouter.post('/', authentication, addRoutine);  
routineRouter.get('/:babyId', authentication, getRoutine); 

module.exports = routineRouter;
