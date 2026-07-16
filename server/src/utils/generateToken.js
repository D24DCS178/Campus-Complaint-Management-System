const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;