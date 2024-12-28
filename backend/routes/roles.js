const CreateRole=require("../controllers/roles")
const express = require("express");

const rolesRouter=express.Router()

rolesRouter.post("/create" , CreateRole)

module.exports=rolesRouter
