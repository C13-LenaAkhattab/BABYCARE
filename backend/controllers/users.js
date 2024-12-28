const UserModel = require("../models/userSchema");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");


const register = (req, res) => {
  const { email, password, firstName } = req.body;

  const newUser = new UserModel({ email, password, firstName, role:"677039050dc1d38e298de85f"});
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        user: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
};



const login = (req, res) => {
  const { password, email } = req.body;

  UserModel.findOne({ email: email })
  .populate("role", "-_id -__v")
  .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or the password you have entered is incorrect`,
        });
      }

      try {
        
        const isPasswordValid = await bcrypt.compare(password, result.password);
        if (!isPasswordValid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or the password you have entered is incorrect`,
          });
        }


        const payload = {
          userId: result._id,
          user: result.firstName,
          role: result.role,
        };

        const options = {
          expiresIn: "60m", 
        };

        const token = jwt.sign(payload, process.env.SECRET, options);

        return res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          userId: result._id,
  
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error validating credentials`,
          error: error.message,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};




module.exports = { register, login };
