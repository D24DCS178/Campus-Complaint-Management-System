const adminService = require("../services/adminService");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();

  return res.status(200).json(
    ApiResponse.success(
      "Dashboard statistics fetched successfully.",
      stats,
      200
    )
  );
});

const getAllComplaints = asyncHandler(async (req, res) => {
  const complaints =
    await adminService.getAllComplaints();

  return res.status(200).json(
    ApiResponse.success(
      "Complaints fetched successfully.",
      complaints,
      200
    )
  );
});

const getComplaintDetails = asyncHandler(async (req, res) => {
  const complaint =
    await adminService.getComplaintDetails(
      req.params.complaintId
    );

  return res.status(200).json(
    ApiResponse.success(
      "Complaint fetched successfully.",
      complaint,
      200
    )
  );
});

const updateComplaintStatus = asyncHandler(async (req, res) => {
  const complaint =
    await adminService.updateComplaintStatus(
      req.params.complaintId,
      req.body,
      req.user._id
    );

  return res.status(200).json(
    ApiResponse.success(
      "Complaint updated successfully.",
      complaint,
      200
    )
  );
});

module.exports = {
  getDashboardStats,
  getAllComplaints,
  getComplaintDetails,
  updateComplaintStatus,
};