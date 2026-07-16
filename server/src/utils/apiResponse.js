class ApiResponse {
  constructor(success, statusCode, message, data = null) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(message, data = null, statusCode = 200) {
    return new ApiResponse(true, statusCode, message, data);
  }

  static error(message, statusCode = 500) {
    return new ApiResponse(false, statusCode, message, null);
  }
}

module.exports = ApiResponse;