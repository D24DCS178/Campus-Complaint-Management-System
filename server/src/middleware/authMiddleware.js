const jwt = require("jsonwebtoken");
const User = require("../models/User");

const config = require("../config");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Access denied. No token provided.");
  }

  // Verify JWT
  const decoded = jwt.verify(token, config.JWT_SECRET);

  // Get User
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});

module.exports = {
  protect,
};