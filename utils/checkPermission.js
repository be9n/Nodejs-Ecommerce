const { UnauthenticatedError } = require("../errors");

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;

  if (requestUser._id.toString() !== resourceUserId.toString()) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }

  return;
};

module.exports = checkPermission;
