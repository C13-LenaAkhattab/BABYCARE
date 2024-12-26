const register=require("../controllers/users")
const express = require("express");

const usersRouter=express.Router()

usersRouter.post("/register" , register)

module.exports=usersRouter