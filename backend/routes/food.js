const CreateFood=require("../controllers/food")
const express = require("express");

const foodRouter=express.Router()

foodRouter.post("/create" , CreateFood)

module.exports=foodRouter
