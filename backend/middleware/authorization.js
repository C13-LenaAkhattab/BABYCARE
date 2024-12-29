const authorization = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.token || !req.token.role || !req.token.role.permissions) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized: Missing role or permissions`,
      });
    }

    if (!req.token.role.permissions.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized: Insufficient permissions`,
      });
    }

    next(); 
  };
};

module.exports = authorization;
