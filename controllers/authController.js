const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils/jwt");
const CustomError = require("../errors");

const register = async (req, res) => {
  const user = await User.create(req.body);

  const payload = { userId: user.id, role: user.role };
  attachCookiesToResponse({ res, payload });

  res.status(StatusCodes.CREATED).json({ data: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const payload = { userId: user.id, role: user.role };
  attachCookiesToResponse({ res, payload });

  res.status(StatusCodes.OK).json({ data: user });
};

const logout = async (req, res) => {
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  register,
  login,
  logout,
};
