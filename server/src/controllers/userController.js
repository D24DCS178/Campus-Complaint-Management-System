const userService = require("../services/userService");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user._id);

  return res.status(200).json(
    ApiResponse.success(
      "Profile fetched successfully.",
      user,
      200
    )
  );
});

module.exports = {
  getProfile,
};