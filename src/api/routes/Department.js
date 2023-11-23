const express = require('express');
const router = express.Router();
const Department = require('../model/Department');

// Get all departments
router.get('/', async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
});

// Get a department by id
router.get('/get/:id', async (req, res) => {
    const department = await Department.findById(req.params.id);
    res.json(department);
});

// Create a new department
router.post('/add', async (req, res) => {
    const newDepartment = new Department(req.body);
    const savedDepartment = await newDepartment.save();
    res.json(savedDepartment);
});

// Update a department by id
router.patch('/update/:id', async (req, res) => {
    const updatedDepartment = await Department.updateOne({_id: req.params.id}, {$set: req.body});
    res.json(updatedDepartment);
});

// Delete a department by id
router.delete('/delete/:id', async (req, res) => {
    const deletedDepartment = await Department.deleteOne({_id: req.params.id});
    res.json(deletedDepartment);
});

module.exports = router;
