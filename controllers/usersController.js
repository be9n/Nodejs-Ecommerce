const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.json({ data: users });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.json({ data: user });
};

module.exports = {
    getAllUsers,
    createUser
}
