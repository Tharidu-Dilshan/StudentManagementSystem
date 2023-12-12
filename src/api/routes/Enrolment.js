const express = require("express");
const router = express.Router();
const Enrolment = require("../model/Enrolment");
const { default: logger } = require("../../utils/logger");

// Get all enrolments
router.get("/", async (req, res) => {
  try {
    const enrolments = await Enrolment.find();
    res.json(enrolments);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error fetching enrolments." });
  }
});

// Get an enrolment by id
router.get("/get/:id", async (req, res) => {
  try {
    const enrolment = await Enrolment.findById(req.params.id);
    res.json(enrolment);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error fetching enrolment by ID." });
  }
});

// Create a new enrolment
router.post("/add", async (req, res) => {
  const { studentRegistrationNumber, subjectCode, status } = req.body;

  try {
    // Check if the enrolment already exists
    const existingEnrolment = await Enrolment.findOne({
      studentRegistrationNumber: studentRegistrationNumber,
      subjectCode: subjectCode,
    });

    if (existingEnrolment) {
      // Enrolment already exists, return an error message
      return res
        .status(400)
        .json({ error: "Enrolment already exists in the database." });
    }

    // If the enrolment doesn't exist, create and save it
    const newEnrolment = new Enrolment({
      studentRegistrationNumber: studentRegistrationNumber,
      subjectCode: subjectCode,
      status: status,
    });

    const savedEnrolment = await newEnrolment.save();

    res.json(savedEnrolment);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error creating a new enrolment." });
  }
});

// Update an enrolment by id
router.patch("/update/:id", async (req, res) => {
  try {
    const updatedEnrolment = await Enrolment.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedEnrolment);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error updating enrolment by ID." });
  }
});

// Delete an enrolment by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedEnrolment = await Enrolment.deleteOne({ _id: req.params.id });
    res.json(deletedEnrolment);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error deleting enrolment by ID." });
  }
});

module.exports = router;
