const {AddAdvice, GetAdvice}=require("../controllers/advice")
const express = require("express");
const authorization=require("../middleware/authorization")
const authentication=require("../middleware/authentication")

const adviceRouter=express.Router()

adviceRouter.post("/create" , AddAdvice)
adviceRouter.get("/" , GetAdvice)


module.exports=adviceRouter