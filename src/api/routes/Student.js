const express = require("express");
const router = express.Router();
const Student = require("../model/Student");
const { default: logger } = require("../../utils/logger");

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error fetching students." });
  }
});

// Get a student by id
router.get("/get/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error fetching student by ID." });
  }
});

// Create a new student
router.post("/add", async (req, res) => {
  const { name, age, gender, address, registerNumber } = req.body;
  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({
      registerNumber: registerNumber,
      name: name,
    });

    if (existingStudent) {
      // Student already exists, return an error message
      return res
        .status(400)
        .json({ error: "Student already exists in the database." });
    }

    // If the student doesn't exist, create and save it
    const newStudent = new Student({
      name: name,
      age: age,
      gender: gender,
      address: address,
      registerNumber: registerNumber,
    });
    const savedStudent = await newStudent.save();

    res.json(savedStudent);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error creating a new student." });
  }
});

// Update a student by id
router.patch("/update/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedStudent);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error updating student by ID." });
  }
});

// Delete a student by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.deleteOne({ _id: req.params.id });
    res.json(deletedStudent);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error deleting student by ID." });
  }
});

module.exports = router;
