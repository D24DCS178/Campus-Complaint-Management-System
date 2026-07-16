const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");
const validationMiddleware = require("../middleware/validationMiddleware");
const { protect } = require("../middleware/authMiddleware");
const {
  validateCreateComplaint,
} = require("../validators/complaintValidator");

router.post(
  "/complaints",
  protect,
  validationMiddleware(validateCreateComplaint),
  complaintController.createComplaint
);

router.get(
  "/complaints",
  protect,
  complaintController.getMyComplaints
);

router.get(
  "/complaints/:complaintId",
  protect,
  complaintController.getComplaintById
);

module.exports = router;