const mongoose = require("mongoose");

const ContactExpertSchema = new mongoose.Schema({
    parentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    expertId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['pending', 'responded'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now }
});

const ContactExpertModel = mongoose.model("ContactExpert", ContactExpertSchema);
module.exports = ContactExpertModel;
