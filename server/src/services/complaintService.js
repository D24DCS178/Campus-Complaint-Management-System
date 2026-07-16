const Complaint = require("../models/Complaint");

const generateComplaintId = require("../utils/generateComplaintId");

const ApiError = require("../utils/ApiError");

const {
  COMPLAINT_CATEGORY,
  COMPLAINT_PRIORITY,
} = require("../constants");

const categoryDepartmentMap = {
  [COMPLAINT_CATEGORY.ACADEMIC]: "Academic Office",

  [COMPLAINT_CATEGORY.LIBRARY]: "Library",

  [COMPLAINT_CATEGORY.HOSTEL]: "Hostel Office",

  [COMPLAINT_CATEGORY.TRANSPORT]: "Transport Office",

  [COMPLAINT_CATEGORY.CAFETERIA]: "Cafeteria Management",

  [COMPLAINT_CATEGORY.IT_SUPPORT]: "IT Cell",

  [COMPLAINT_CATEGORY.INFRASTRUCTURE]: "Maintenance Department",

  [COMPLAINT_CATEGORY.EXAMINATION]: "Examination Cell",

  [COMPLAINT_CATEGORY.ADMINISTRATION]: "Administration Office",

  [COMPLAINT_CATEGORY.OTHER]: "General Administration",
};

const createComplaint = async (complaintData, studentId) => {
  const complaintId = await generateComplaintId();

  const department =
    categoryDepartmentMap[complaintData.category];

  if (!department) {
    throw new ApiError(400, "Invalid complaint category.");
  }

  const complaint = await Complaint.create({
    complaintId,

    student: studentId,

    title: complaintData.title,

    description: complaintData.description,

    category: complaintData.category,

    department,

    priority:
      complaintData.priority ||
      COMPLAINT_PRIORITY.MEDIUM,
  });

  return complaint;
};

const getMyComplaints = async (studentId) => {
  return await Complaint.find({
    student: studentId,
  }).sort({
    createdAt: -1,
  });
};

const getComplaintById = async (
  complaintId,
  studentId
) => {
  const complaint = await Complaint.findOne({
    complaintId,
    student: studentId,
  });

  if (!complaint) {
    throw new ApiError(
      404,
      "Complaint not found."
    );
  }

  return complaint;
};

module.exports = {
  createComplaint,

  getMyComplaints,

  getComplaintById,
};