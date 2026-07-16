const validator = require("validator");

const validateRegister = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push("Name must be at least 3 characters long.");
  }

  if (!data.email || !validator.isEmail(data.email)) {
    errors.push("Please provide a valid email address.");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  if (!data.enrollmentNo) {
    errors.push("Enrollment Number is required.");
  }

  if (!data.department) {
    errors.push("Department is required.");
  }

  return errors;
};

const validateLogin = (data) => {
  const errors = [];

  if (!data.email || !validator.isEmail(data.email)) {
    errors.push("Please provide a valid email address.");
  }

  if (!data.password) {
    errors.push("Password is required.");
  }

  return errors;
};

module.exports = {
  validateRegister,
  validateLogin,
};