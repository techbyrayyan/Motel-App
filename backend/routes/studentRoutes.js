const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { registerStudent } = require("../controllers/studentControllers");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route
router.post("/register", upload.single("file"), registerStudent);

module.exports = router;
