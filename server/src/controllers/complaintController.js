const complaintService = require("../services/complaintService");

const ApiResponse = require("../utils/apiResponse");

const asyncHandler = require("../utils/asyncHandler");

const createComplaint = asyncHandler(async (req, res) => {
  const complaint = await complaintService.createComplaint(
    req.body,
    req.user._id
  );

  return res.status(201).json(
    ApiResponse.success(
      "Complaint submitted successfully.",
      complaint,
      201
    )
  );
});

const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await complaintService.getMyComplaints(
    req.user._id
  );

  return res.status(200).json(
    ApiResponse.success(
      "Complaints fetched successfully.",
      complaints,
      200
    )
  );
});

const getComplaintById = asyncHandler(async (req, res) => {
  const complaint =
    await complaintService.getComplaintById(
      req.params.complaintId,
      req.user._id
    );

  return res.status(200).json(
    ApiResponse.success(
      "Complaint fetched successfully.",
      complaint,
      200
    )
  );
});

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
};