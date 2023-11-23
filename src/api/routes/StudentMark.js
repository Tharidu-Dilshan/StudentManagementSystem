const express = require('express');
const router = express.Router();
const StudentMark = require('../model/StudentMark');

// Get all student marks
router.get('/', async (req, res) => {
    const studentMarks = await StudentMark.find();
    res.json(studentMarks);
});

// Get a student mark by id
router.get('/get/:id', async (req, res) => {
    const studentMark = await StudentMark.findById(req.params.id);
    res.json(studentMark);
});

// Create a new student mark
router.post('/add', async (req, res) => {
    const newStudentMark = new StudentMark(req.body);
    const savedStudentMark = await newStudentMark.save();
    res.json(savedStudentMark);
});

// Update a student mark by id
router.patch('/update/:id', async (req, res) => {
    const updatedStudentMark = await StudentMark.updateOne({_id: req.params.id}, {$set: req.body});
    res.json(updatedStudentMark);
});

// Delete a student mark by id
router.delete('/delete/:id', async (req, res) => {
    const deletedStudentMark = await StudentMark.deleteOne({_id: req.params.id});
    res.json(deletedStudentMark);
});

module.exports = router;
