const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    roomNumber: { type: String },
    mealType: { type: String },
    file: { type: String }, // store file path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
