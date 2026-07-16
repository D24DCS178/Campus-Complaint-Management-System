const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

const {
  authorizeAdmin,
} = require("../middleware/adminMiddleware");

router.get(
  "/admin/dashboard",
  protect,
  authorizeAdmin,
  adminController.getDashboardStats
);

router.get(
  "/admin/complaints",
  protect,
  authorizeAdmin,
  adminController.getAllComplaints
);

router.get(
  "/admin/complaints/:complaintId",
  protect,
  authorizeAdmin,
  adminController.getComplaintDetails
);

router.patch(
  "/admin/complaints/:complaintId",
  protect,
  authorizeAdmin,
  adminController.updateComplaintStatus
);

module.exports = router;