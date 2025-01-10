const BabyModel = require('../models/babySchema');

const addBaby = (req, res) => {
    const { firstName, ageInMonths } = req.body;
    
    const parent = req.token.userId;
    
    if (!parent) {
      return res.status(400).json({
        success: false,
        message: "Parent ID not found in token"
      });
    }
  
    const newBaby = new BabyModel({
      firstName,
      ageInMonths,
      parent,
    });
  
    newBaby
      .save()
      .then((savedBaby) => {
        res.status(201).json({
          success: true,
          message: "Baby added successfully.",
          baby: savedBaby,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: `Failed to add baby: ${error.message}`,
        });
      });
  };


const getBabiesByParent = (req, res) => {
    const { userId } = req.params.userId;

    BabyModel.find({ parent: userId })
        .populate('parent', 'firstName email')
        .then((babies) => {
            if (babies.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Babies retrieved successfully.",
                    babies,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `No babies found for parent ID ${userId}.`,
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Failed to retrieve babies: ${error.message}`,
            });
        });
};

module.exports={addBaby, getBabiesByParent}