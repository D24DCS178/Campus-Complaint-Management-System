const mongoose = require("mongoose");

const {
  COMPLAINT_STATUS,
  COMPLAINT_PRIORITY,
  COMPLAINT_CATEGORY,
} = require("../constants");

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      unique: true,
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    category: {
      type: String,
      enum: Object.values(COMPLAINT_CATEGORY),
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: Object.values(COMPLAINT_PRIORITY),
      default: COMPLAINT_PRIORITY.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(COMPLAINT_STATUS),
      default: COMPLAINT_STATUS.PENDING,
    },

    remarks: {
      type: String,
      default: "",
    },

    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);