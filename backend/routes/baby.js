const express = require('express');
const babyRouter = express.Router();
const { addBaby, getBabiesByParent } = require('../controllers/baby');
const authentication = require('../middleware/authentication');

babyRouter.post('/', authentication, addBaby);
babyRouter.get('/:userId', getBabiesByParent);


module.exports = babyRouter;
