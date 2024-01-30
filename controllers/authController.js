const register = (req, res) => {
  res.json({ data: "register" });
};

const login = (req, res) => {
  res.json({ data: "login" });
};

const logout = (req, res) => {
  res.json({ data: "logout" });
};

module.exports = {
  register,
  login,
  logout,
};
