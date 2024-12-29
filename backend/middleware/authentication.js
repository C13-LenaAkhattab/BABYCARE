const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: `Forbidden: No token provided`,
    });
  }

  const token = authHeader.split(" ")[1]; 

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: `The token is invalid or expired`,
      });
    }

    req.token = decoded; 
    next(); 
  });
};

module.exports = authentication;
