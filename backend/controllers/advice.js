const AdviceModel=require("../models/AdviceSchema")

const AddAdvice=(req,res)=>{
const {advice , number}=req.body
const newAdvice=new AdviceModel({advice , number})
newAdvice
.save()
.then((result)=>{
    res.status(201).json({
        success:true,
        message: `Added successfully`,
        post: result
    })

})
.catch((err)=>{
    res.status(400).json({
        success:false,
        message: `Error Adding Advice:  ${err}`
    })
})
}
const GetAdvice = (req, res) => {
  
      
      AdviceModel.find()
        .then((result) => {
          if (result.length === 0) {
            return res.status(404).json({
              success: false,
              message: `No advice available.`,
            });
          }
          res.status(200).json({
            success: true,
            advice: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Error fetching advice: ${err.message}`,
          });
        });
    
    }
  

module.exports={AddAdvice, GetAdvice}
