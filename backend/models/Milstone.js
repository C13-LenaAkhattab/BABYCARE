const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    babyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Baby', required: true }, // Reference to Baby
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Parent
    milestoneName: { type: String, required: true }, // e.g., "First Step", "First Word"
    dateAchieved: { type: Date }, // When the milestone was achieved
    ageAchieved: { type: Number }, // Age in months when milestone was achieved
    notes: { type: String }, // Additional notes (optional)
}, { timestamps: true });

const MilestoneModel = mongoose.model('Milestone', milestoneSchema);

module.exports = MilestoneModel;
