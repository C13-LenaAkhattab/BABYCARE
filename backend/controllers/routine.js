const RoutineModel=require("../models/routineSchema")


const addRoutine = (req, res) => {
    const { babyId, activities } = req.body;

    const newRoutine = new Routine({
        babyId,
        activities,
    });

    newRoutine.save()
        .then(savedRoutine => {
            res.status(201).json({
                success: true,
                message: "Routine added successfully.",
                routine: savedRoutine,
            });
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: `Failed to add routine: ${error.message}`,
            });
        });
};

const getRoutine = (req, res) => {
    const { babyId } = req.params;

    Routine.findOne({ babyId })
        .then(routine => {
            if (!routine) {
                return res.status(404).json({ success: false, message: "Routine not found." });
            }
            res.status(200).json({
                success: true,
                routine,
            });
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: `Error retrieving routine: ${error.message}`,
            });
        });
};

module.exports = { addRoutine, getRoutine };
