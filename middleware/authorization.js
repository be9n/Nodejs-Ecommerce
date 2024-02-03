const CustomError = require("../errors");

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new CustomError.UnauthorizedError("Unauthorized to access this route");
  }

  next();
};

module.exports = authorize;
