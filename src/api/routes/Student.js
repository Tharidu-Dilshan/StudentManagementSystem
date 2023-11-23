const express = require('express');
const router = express.Router();
const Student = require('../model/Student');

// Get all students
router.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Get a student by id
router.get('/get/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
});

// Create a new student
router.post('/add', async (req, res) => {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.json(savedStudent);
});

// Update a student by id
router.patch('/update/:id', async (req, res) => {
    const updatedStudent = await Student.updateOne({_id: req.params.id}, {$set: req.body});
    res.json(updatedStudent);
});

// Delete a student by id
router.delete('/delete/:id', async (req, res) => {
    const deletedStudent = await Student.deleteOne({_id: req.params.id});
    res.json(deletedStudent);
});

module.exports = router;
