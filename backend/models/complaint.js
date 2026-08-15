const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Water", "Roads & Drainage", "Street Lights", "Garbage & Sanitation", "Others"],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  wardNumber: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  reporterName: {
    type: String,
    required: true,
  },
  reporterPhone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  resolutionNote: {
  type: String,
  default: '',
  },
resolutionPhotoUrl: {
  type: String,
  default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);