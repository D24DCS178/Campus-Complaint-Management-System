const User = require("../models/User");

const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");

const registerUser = async (userData) => {

  const existingEmail = await User.findOne({
    email: userData.email.toLowerCase(),
  });

  if (existingEmail) {
    throw new ApiError(409, "Email already registered.");
  }

  const existingEnrollment = await User.findOne({
    enrollmentNo: userData.enrollmentNo.toUpperCase(),
  });

  if (existingEnrollment) {
    throw new ApiError(409, "Enrollment number already exists.");
  }

  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    enrollmentNo: userData.enrollmentNo,
    department: userData.department,
  });

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

const loginUser = async (loginData) => {
  const user = await User.findOne({
    email: loginData.email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isMatch = await user.comparePassword(loginData.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};