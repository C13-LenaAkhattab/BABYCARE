const {CreateFood, createNewComment, getByStage, getComments}=require("../controllers/food")
const express = require("express");
const authorization=require("../middleware/authorization")
const authentication=require("../middleware/authentication")

const foodRouter=express.Router()

foodRouter.post("/create" , CreateFood)
foodRouter.post("/:id/comments" ,authentication,authorization("COMMENT"), createNewComment)
foodRouter.get("/:id/comments" , getComments)
foodRouter.get("/:stage/" , getByStage)


module.exports=foodRouter
