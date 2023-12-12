const express = require("express");
const router = express.Router();
const Department = require("../model/Department");
const { default: logger } = require("../../utils/logger");

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error fetching departments." });
  }
});

// Get a department by id
router.get("/get/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    res.json(department);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error fetching department by ID." });
  }
});

// Create a new department
router.post("/add", async (req, res) => {
  const { dCode, dName } = req.body;
  try {
    // Check if the department already exists
    const existingDepartment = await Department.findOne({ name: dName });

    if (existingDepartment) {
      // Department already exists, return an error message
      return res
        .status(400)
        .json({ error: "Department already exists in the database." });
    }

    // If the department doesn't exist, create and save it
    const newDepartment = new Department({
      code: dCode,
      name: dName,
    });
    const savedDepartment = await newDepartment.save();

    res.json(savedDepartment);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error creating a new department." });
  }
});

// Update a department by id
router.patch("/update/:id", async (req, res) => {
  try {
    const updatedDepartment = await Department.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedDepartment);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error updating department by ID." });
  }
});

// Delete a department by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedDepartment = await Department.deleteOne({
      _id: req.params.id,
    });
    res.json(deletedDepartment);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error deleting department by ID." });
  }
});

module.exports = router;
