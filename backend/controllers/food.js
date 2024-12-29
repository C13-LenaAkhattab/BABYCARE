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

const createNewComment = (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;
    // const commenter = req.token.userId;
    const newComment = new CommentModel({
      comment,
    //   commenter,
    });
    newComment
      .save()
      .then((result) => {
        FoodModel
          .findByIdAndUpdate(
            { _id: id },
            { $push: { comments: result._id } },
            { new: true }
          )
          .then(() => {
            res.status(201).json({
              success: true,
              message: `Comment added`,
              comment: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: `Server Error`,
              err: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
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


    
module.exports={CreateFood , createNewComment, getByStage}