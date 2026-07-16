const ApiResponse = require("../utils/apiResponse");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Log the error
  console.error("==================================");
  console.error("ERROR:", err.message);
  console.error(err.stack);
  console.error("==================================");

  return res.status(statusCode).json(
    ApiResponse.error(
      err.message || "Internal Server Error",
      statusCode
    )
  );
};

module.exports = errorMiddleware;