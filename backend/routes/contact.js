const express = require("express");
const contactRouter = express.Router();
const { contactExpert, getMessagesForExpert, getMessagesForParent } = require("../controllers/contact");
const authentication = require("../middleware/authentication");

contactRouter.post("/contact", authentication, contactExpert);  

contactRouter.get("/messages/expert", authentication, getMessagesForExpert); 

contactRouter.get("/messages/parent", authentication, getMessagesForParent); 
module.exports = contactRouter;
