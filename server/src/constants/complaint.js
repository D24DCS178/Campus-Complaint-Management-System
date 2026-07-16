const COMPLAINT_STATUS = Object.freeze({
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
});

const COMPLAINT_PRIORITY = Object.freeze({
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
});

const COMPLAINT_CATEGORY = Object.freeze({
  ACADEMIC: "Academic",
  LIBRARY: "Library",
  HOSTEL: "Hostel",
  TRANSPORT: "Transport",
  CAFETERIA: "Cafeteria",
  IT_SUPPORT: "IT Support",
  INFRASTRUCTURE: "Infrastructure",
  EXAMINATION: "Examination",
  ADMINISTRATION: "Administration",
  OTHER: "Other",
});

module.exports = {
  COMPLAINT_STATUS,
  COMPLAINT_PRIORITY,
  COMPLAINT_CATEGORY,
};