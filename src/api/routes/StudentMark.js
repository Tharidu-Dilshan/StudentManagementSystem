const express = require("express");
const router = express.Router();
const StudentMark = require("../model/StudentMark");
const { default: logger } = require("../../utils/logger");

// Get all student marks
router.get("/", async (req, res) => {
  try {
    const studentMarks = await StudentMark.find();
    res.json(studentMarks);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error fetching student marks." });
  }
});

// Get a student mark by id
router.get("/get/:id", async (req, res) => {
  try {
    const studentMark = await StudentMark.findById(req.params.id);
    res.json(studentMark);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error fetching student mark by ID." });
  }
});

// Create a new student mark
router.post("/add", async (req, res) => {
  const { enrollmentId, grade, marks } = req.body;

  try {
    // Check if the student mark already exists
    const existingStudentMark = await StudentMark.findOne({
      enrollmentId: enrollmentId,
      grade: grade,
    });

    if (existingStudentMark) {
      // Student mark already exists, return an error message
      return res
        .status(400)
        .json({ error: "Student mark already exists in the database." });
    }

    // If the student mark doesn't exist, create and save it
    const newStudentMark = new StudentMark({
      enrollmentId: enrollmentId,
      grade: grade,
      marks: marks,
    });

    const savedStudentMark = await newStudentMark.save();

    res.json(savedStudentMark);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error creating a new student mark." });
  }
});

// Update a student mark by id
router.patch("/update/:id", async (req, res) => {
  try {
    const updatedStudentMark = await StudentMark.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedStudentMark);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error updating student mark by ID." });
  }
});

// Delete a student mark by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedStudentMark = await StudentMark.deleteOne({
      _id: req.params.id,
    });
    res.json(deletedStudentMark);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error deleting student mark by ID." });
  }
});

module.exports = router;
