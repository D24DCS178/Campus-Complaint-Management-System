const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

module.exports = {
  getProfile,
};