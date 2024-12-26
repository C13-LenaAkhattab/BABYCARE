const UserModel = require('../../models/userSchema');
const register = (req, res) => {
    console.log(req.body);  // Log the incoming request body

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
 module.exports=register