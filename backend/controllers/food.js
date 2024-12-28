const FoodModel = require("../models/FoodPost")

const CreateFood=(req , res)=>{
const {name , recipe , ingredients,describtion, stage}=req.body
const newRecipe=new FoodModel({name , recipe , ingredients,describtion, stage})
newRecipe
.save()
.then((result)=>{
    res.status(201).json({
        success:true,
        message: `Food Recipe post Added successfully`,
        post: result
    })

})
.catch((err)=>{
    res.status(400).json({
        success:false,
        message: `Error creating post:  ${err}`
    })
})
}

module.exports=CreateFood