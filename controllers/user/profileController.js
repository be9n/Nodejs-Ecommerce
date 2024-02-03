const User = require("../../models/User");
const CustomError = require("../../errors");
const { StatusCodes } = require("http-status-codes");

exports.showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

exports.showProfile = async (req, res) => {
  const user = req.user;

  res.status(StatusCodes.OK).json(user);
};

exports.updateProfile = async (req, res) => {
  const user = req.user;

  Object.assign(user, req.body);
  await user.save();

  // const user = await User.findByIdAndUpdate(req.user._id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });

  res.status(StatusCodes.OK).json(user);
};

exports.updatePassword = async (req, res) => {
  const user = req.user;
  const { oldPassword, newPassword } = req.body;

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Old password is not correct");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: true });
};
