const UserModel = require("../../models/userSchema");
const bcrypt=require("bcrypt")

const register = (req, res) => {
  const { email, password, firstName } = req.body;

  const newUser = new UserModel({ email, password, firstName });
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
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((result) => {
      if (!result) {
        res.status(400).json({
          success: false,
          message: "Email not found",
        });
      } else {
        if (result.password === password) {
          res.status(200).json({
            success: true,
            message: "login successfully"
          })
        } else {
          res.status(400).json({
            success: false,
            message: "Wrong email or password"
          });
        }
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
};

module.exports = { register, login };
