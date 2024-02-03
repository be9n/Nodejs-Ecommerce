const User = require("../models/User");
const CustomError = require("../errors");
const { verifyJWT } = require("../utils");

const auth = async (req, res, next) => {
  const { accessToken } = req.signedCookies;
  if (!accessToken) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const payload = verifyJWT(accessToken);

    const user = await User.findById(payload.userId);
    if (!user) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }

    req.user = user;
    
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
