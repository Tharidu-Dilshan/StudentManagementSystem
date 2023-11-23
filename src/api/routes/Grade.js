const express = require('express');
const router = express.Router();
const Grade = require('../model/Grade');

// Get all grades
router.get('/', async (req, res) => {
    const grades = await Grade.find();
    res.json(grades);
});

// Get a grade by id
router.get('/get/:id', async (req, res) => {
    const grade = await Grade.findById(req.params.id);
    res.json(grade);
});

// Create a new grade
router.post('/add', async (req, res) => {
    const newGrade = new Grade(req.body);
    const savedGrade = await newGrade.save();
    res.json(savedGrade);
});

// Update a grade by id
router.patch('/update/:id', async (req, res) => {
    const updatedGrade = await Grade.updateOne({_id: req.params.id}, {$set: req.body});
    res.json(updatedGrade);
});

// Delete a grade by id
router.delete('/delete/:id', async (req, res) => {
    const deletedGrade = await Grade.deleteOne({_id: req.params.id});
    res.json(deletedGrade);
});

module.exports = router;
