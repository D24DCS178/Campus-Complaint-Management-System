const authService = require("../services/authService");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
    const result = await authService.registerUser(req.body);
    return res.status(201).json(
        ApiResponse.success(
            "User registered successfully",
            result,
            201
        )
    );
});

const login = asyncHandler(async (req, res) => {
    const result = await authService.loginUser(req.body);
    return res.status(200).json(
        ApiResponse.success(
            "Login successful",
            result,
            200
        )
    );
}); 

const getProfile = asyncHandler(async (req, res) => {

  return res.status(200).json(
    ApiResponse.success(
      "Profile fetched successfully",
      req.user,
      200
    )
  );

});

module.exports = {
    register,
    login,
    getProfile,
};