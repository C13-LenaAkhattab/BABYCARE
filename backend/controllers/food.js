const FoodModel = require("../models/FoodPost")
const CommentModel=require("../models/comments")

const CreateFood=(req , res)=>{
const {name , recipe , ingredients,description, stage ,benefits}=req.body
const newRecipe=new FoodModel({name , recipe , ingredients,description, stage, benefits})
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

const createNewComment = async (req, res) => {
  const id = req.params.id; 
  const { comment } = req.body; 
  const commenter = req.token.userId; 

  try {
    const newComment = new CommentModel({ comment, commenter });
    const savedComment = await newComment.save(); 

    await FoodModel.findByIdAndUpdate(
      id,
      { $push: { comments: savedComment._id } },
      { new: true } 
    );

    res.status(201).json({
      success: true,
      message: `Comment added`,
      comment: savedComment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};


  const getByStage = (req, res) => {
    const stage = req.params.stage;

    FoodModel
      .find({ stage: stage }) 
      .then((result) => {
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No foods found for the provided stage.',
            });
        }

        res.status(200).json({
            success: true,
            food: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            err: err.message,
        });
      });
};

const getComments = async (req, res) => {
  const id = req.params.id;
    
  try {
    const foodItem = await FoodModel.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'commenter',
        select: 'firstName' 
      }
    });

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found.",
      });
    }

    if (!foodItem.comments || foodItem.comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No comments found for this food item.",
      });
    }

    res.status(200).json({
      success: true,
      comments: foodItem.comments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};


    
module.exports={CreateFood , createNewComment, getByStage, getComments}