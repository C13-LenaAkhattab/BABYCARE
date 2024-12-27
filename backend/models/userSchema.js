const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;


UserSchema.pre('save', async function(next) {
  this.email = this.email.toLowerCase();
  
    this.password = await bcrypt.hash(this.password, 10);
  
  
  next()
});


