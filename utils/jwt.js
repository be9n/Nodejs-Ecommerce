const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const attachCookiesToResponse = ({ res, payload }) => {
  const accessToken = createJWT({ payload });

  const time = 1000 * 60 * 60 * 24;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + time),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  verifyJWT,
  attachCookiesToResponse,
};
