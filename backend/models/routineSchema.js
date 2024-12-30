const mongoose = require("mongoose");

const RoutineSchema = new mongoose.Schema({
    babyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Baby', 
        required: true 
    },
    activities: [
        {
            name: String, 
            startTime: Date, 
            endTime: Date, 
            type: { type: String, enum: ['feeding', 'nap', 'diaper', 'play', 'medicine'], required: true },
            notes: String,
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const RoutineModel = mongoose.model("Routine", RoutineSchema);
module.exports = RoutineModel;
