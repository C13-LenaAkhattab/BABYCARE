const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
    role: { type: String, required: true },
    permissions: [{ type: String, required: true }],
});

const RolesModel = mongoose.model("Role", RolesSchema);
module.exports = RolesModel;
