const {
  COMPLAINT_CATEGORY,
  COMPLAINT_PRIORITY,
} = require("../constants");

const validateCreateComplaint = (data) => {
  const errors = [];

  if (!data.title || data.title.trim().length < 5) {
    errors.push("Title must be at least 5 characters long.");
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters long.");
  }

  if (
    !data.category ||
    !Object.values(COMPLAINT_CATEGORY).includes(data.category)
  ) {
    errors.push("Please select a valid complaint category.");
  }

  if (
    data.priority &&
    !Object.values(COMPLAINT_PRIORITY).includes(data.priority)
  ) {
    errors.push("Please select a valid complaint priority.");
  }

  return errors;
};

module.exports = {
  validateCreateComplaint,
};