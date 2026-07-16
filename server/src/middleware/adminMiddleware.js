const ApiError = require("../utils/ApiError");

const { ROLES } = require("../constants");

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    return next(
      new ApiError(
        403,
        "Access denied. Admin privileges required."
      )
    );
  }

  next();
};

module.exports = {
  authorizeAdmin,
};