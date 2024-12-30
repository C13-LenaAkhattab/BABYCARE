const {addMilestone,getMilestones}=require("../controllers/milestone")
const express = require("express");

const milestoneRouter=express.Router()

milestoneRouter.post("/create" , addMilestone)
milestoneRouter.get("/", getMilestones)

module.exports=milestoneRouter
