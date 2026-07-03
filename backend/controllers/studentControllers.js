const Student = require("../models/Student");

exports.registerStudent = async (req, res) => {
  try {
    const { name, company, roomNumber } = req.body;
    const mealType = "Breakfast"; // fixed for breakfast page
    const filePath = req.file ? req.file.path : null;

    const newStudent = new Student({
      name,
      company,
      roomNumber,
      mealType,
      file: filePath,
    });

    await newStudent.save();
    console.log("✅ New Student Saved:", newStudent);

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    console.error("❌ Error in registerStudent:", error);
    res.status(500).json({ message: "Error registering student" });
  }
};
