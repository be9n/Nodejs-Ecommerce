const User = require("../../models/User");
const CustomError = require("../../errors");
const { StatusCodes } = require("http-status-codes");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: "buyer" });

  res.status(StatusCodes.OK).json({ users });
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id, role: "buyer" });
  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ user });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleted = await User.findByIdAndDelete(id)
  if (!deleted) {
    throw new CustomError.NotFoundError('User not found')
  }

  res.status(200).json({ success: true });
};
