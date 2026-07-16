const Complaint = require("../models/Complaint");
const ApiError = require("../utils/ApiError");
const { COMPLAINT_STATUS } = require("../constants");

const getDashboardStats = async () => {
  const totalComplaints = await Complaint.countDocuments();

  const pendingComplaints = await Complaint.countDocuments({
    status: COMPLAINT_STATUS.PENDING,
  });

  const inProgressComplaints = await Complaint.countDocuments({
    status: COMPLAINT_STATUS.IN_PROGRESS,
  });

  const resolvedComplaints = await Complaint.countDocuments({
    status: COMPLAINT_STATUS.RESOLVED,
  });

  const recentComplaints = await Complaint.find()
    .populate("student", "name enrollmentNo")
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalComplaints,
    pendingComplaints,
    inProgressComplaints,
    resolvedComplaints,
    recentComplaints,
  };
};

const getAllComplaints = async () => {
  return await Complaint.find()
    .populate(
      "student",
      "name email enrollmentNo department"
    )
    .sort({ createdAt: -1 });
};

const getComplaintDetails = async (complaintId) => {
  const complaint = await Complaint.findOne({
    complaintId,
  }).populate(
    "student",
    "name email enrollmentNo department"
  );

  if (!complaint) {
    throw new ApiError(404, "Complaint not found.");
  }

  return complaint;
};

const updateComplaintStatus = async (
  complaintId,
  updateData,
  adminId
) => {
  const complaint = await Complaint.findOne({
    complaintId,
  });

  if (!complaint) {
    throw new ApiError(404, "Complaint not found.");
  }

  complaint.status = updateData.status;

  if (updateData.remarks) {
    complaint.remarks = updateData.remarks;
  }

  if (updateData.status === COMPLAINT_STATUS.RESOLVED) {
    complaint.resolvedBy = adminId;
    complaint.resolvedAt = new Date();
  }

  await complaint.save();

  return complaint;
};

module.exports = {
  getDashboardStats,
  getAllComplaints,
  getComplaintDetails,
  updateComplaintStatus,
};