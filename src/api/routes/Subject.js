const express = require('express');
const router = express.Router();
const Subject = require('../model/Subject');

// Get all subjects
router.get('/', async (req, res) => {
    const subjects = await Subject.find();
    res.json(subjects);
});

// Get a subject by id
router.get('/get/:id', async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    res.json(subject);
});

// Create a new subject
router.post('/add', async (req, res) => {
    const newSubject = new Subject(req.body);
    const savedSubject = await newSubject.save();
    res.json(savedSubject);
});

// Update a subject by id
router.patch('/update/:id', async (req, res) => {
    const updatedSubject = await Subject.updateOne({_id: req.params.id}, {$set: req.body});
    res.json(updatedSubject);
});

// Delete a subject by id
router.delete('/delete/:id', async (req, res) => {
    const deletedSubject = await Subject.deleteOne({_id: req.params.id});
    res.json(deletedSubject);
});

module.exports = router;
