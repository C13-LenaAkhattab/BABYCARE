const ContactExpertModel = require("../models/contactExpert");

const contactExpert = (req, res) => {
    const { expertId, subject, message } = req.body;
    const parentId = req.token.userId;  

    // Create a new contact message
    const newMessage = new ContactExpertModel({
        parentId,
        expertId,
        subject,
        message,
    });

    newMessage.save()
        .then(savedMessage => {
            res.status(201).json({
                success: true,
                message: "Your message has been sent to the expert.",
                contactMessage: savedMessage,
            });
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: `Failed to send message: ${error.message}`,
            });
        });
};

const getMessagesForExpert = (req, res) => {
    const expertId = req.token.userId; 

    ContactExpertModel.find({ expertId })
        .then(messages => {
            res.status(200).json({
                success: true,
                messages,
            });
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: `Error retrieving messages: ${error.message}`,
            });
        });
};

const getMessagesForParent = (req, res) => {
    const parentId = req.token.userId;  

    ContactExpertModel.find({ parentId })
        .then(messages => {
            res.status(200).json({
                success: true,
                messages,
            });
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: `Error retrieving messages: ${error.message}`,
            });
        });
};

module.exports = { contactExpert, getMessagesForExpert, getMessagesForParent };
