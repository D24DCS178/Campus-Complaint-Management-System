const ApiResponse = require("../utils/apiResponse");

const errorMiddleware = (err, req, res, next) => {
  console.error("ERROR:", err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json(
    ApiResponse.error(
      err.message || "Internal Server Error",
      statusCode
    )
  );
};

module.exports = errorMiddleware;