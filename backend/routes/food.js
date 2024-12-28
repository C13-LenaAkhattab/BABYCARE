const {CreateFood, createNewComment}=require("../controllers/food")
const express = require("express");
const authorization=require("../middleware/authorization")

const foodRouter=express.Router()

foodRouter.post("/create" , CreateFood)
foodRouter.post("/:id/comments/" , createNewComment)

module.exports=foodRouter
