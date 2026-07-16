const Complaint = require("../models/Complaint");

const generateComplaintId = async () => {
  const today = new Date();

  const date =
    today.getFullYear().toString() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  // Find the latest complaint
  const latestComplaint = await Complaint.findOne().sort({
    createdAt: -1,
  });

  let sequence = 1;

  if (latestComplaint) {
    const lastId = latestComplaint.complaintId;
    const lastSequence = parseInt(lastId.split("-")[2], 10);
    sequence = lastSequence + 1;
  }

  return `CMP-${date}-${String(sequence).padStart(3, "0")}`;
};

module.exports = generateComplaintId;