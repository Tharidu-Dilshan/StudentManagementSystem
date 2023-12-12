const express = require("express");
const router = express.Router();
const Grade = require("../model/Grade");
const { default: logger } = require("../../utils/logger");

// get all grades
router.get("/", async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    logger.error(error);

    res.status(500).json({ message: "Error with Getting Grades" });
  }
});

// Add a new grade
router.post("/", async (req, res) => {
  try {
    const { grade, minRange, maxRange } = req.body;

    // Check if the grade already exists
    const existingGrade = await Grade.findOne({ grade: grade });

    if (existingGrade) {
      // Grade already exists, return an error message
      return res
        .status(400)
        .json({ error: "Grade already exists in the database." });
    }

    // If the grade doesn't exist, create and save it
    const newGrade = new Grade({
      grade: grade,
      minRange: minRange,
      maxRange: maxRange,
    });

    await newGrade.save();
    res.json(newGrade);
  } catch (error) {
    logger.error(error);

    res.status(500).json({ message: "Error with adding Grade" });
  }
});

module.exports = router;
