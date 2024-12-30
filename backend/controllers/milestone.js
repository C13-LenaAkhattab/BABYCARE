const MilestoneModel=require("../models/Milstone")

const addMilestone = (req, res) => {
    const { babyId, parentId, milestoneName, dateAchieved, ageAchieved, notes } = req.body;

    const milestone = new MilestoneModel({
        babyId,
        parentId,
        milestoneName,
        dateAchieved,
        ageAchieved,
        notes
    });

    milestone
        .save()
        .then((savedMilestone) => {
            res.status(201).json({
                success: true,
                message: "Milestone added successfully.",
                milestone: savedMilestone
            });
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                message: `Failed to add milestone: ${error}`,
            });
        });
};
const getMilestones = (req, res) => {
    const { babyId } = req.params;

    MilestoneModel.find({ babyId })
        .then((milestones) => {
            if (milestones.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Milestones retrieved successfully.",
                    milestones: milestones,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No milestones found for this baby.",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Failed to retrieve milestones: ${error}`,
            });
        });
};



module.exports={addMilestone ,getMilestones}