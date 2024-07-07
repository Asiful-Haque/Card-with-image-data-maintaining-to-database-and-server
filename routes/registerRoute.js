const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerUser, getAllRegistrations } = require("../controller/registrationController");

const router = express.Router();

// Set up multer storage for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/api/submit", upload.single("image"), registerUser);
router.get("/api/getRegistrations", getAllRegistrations);

module.exports = router;
