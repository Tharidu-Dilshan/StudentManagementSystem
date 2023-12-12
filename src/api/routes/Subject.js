const express = require("express");
const router = express.Router();
const Subject = require("../model/Subject");
const { default: logger } = require("../../utils/logger");

// Get all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error fetching subjects." });
  }
});

// Get a subject by id
router.get("/get/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.json(subject);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error fetching subject by ID." });
  }
});

// Create a new subject
router.post("/add", async (req, res) => {
  const { code, departmentId, name, credit } = req.body;

  try {
    // Check if the subject already exists
    const existingSubject = await Subject.findOne({
      code: code,
      departmentId: departmentId,
    });

    if (existingSubject) {
      // Subject already exists, return an error message
      return res
        .status(400)
        .json({ error: "Subject already exists in the database." });
    }

    // If the subject doesn't exist, create and save it
    const newSubject = new Subject({
      code: code,
      departmentId: departmentId,
      name: name,
      credit: credit,
    });

    const savedSubject = await newSubject.save();

    res.json(savedSubject);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error creating a new subject." });
  }
});

// Update a subject by id
router.patch("/update/:id", async (req, res) => {
  try {
    const updatedSubject = await Subject.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedSubject);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error updating subject by ID." });
  }
});

// Delete a subject by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedSubject = await Subject.deleteOne({ _id: req.params.id });
    res.json(deletedSubject);
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ error: error.message || "Error deleting subject by ID." });
  }
});

module.exports = router;
