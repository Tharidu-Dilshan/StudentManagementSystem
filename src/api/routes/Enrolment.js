const express = require('express');
const router = express.Router();
const Enrolment = require('../model/Enrolment');

// Get all enrolments
router.get('/', async (req, res) => {
    const enrolments = await Enrolment.find();
    res.json(enrolments);
});

// Get an enrolment by id
router.get('/get/:id', async (req, res) => {
    const enrolment = await Enrolment.findById(req.params.id);
    res.json(enrolment);
});

// Create a new enrolment
router.post('/add', async (req, res) => {
    const newEnrolment = new Enrolment(req.body);
    const savedEnrolment = await newEnrolment.save();
    res.json(savedEnrolment);
});

// Update an enrolment by id
router.patch('/update/:id', async (req, res) => {
    const updatedEnrolment = await Enrolment.updateOne({_id: req.params.id}, {$set: req.body});
    res.json(updatedEnrolment);
});

// Delete an enrolment by id
router.delete('/delete/:id', async (req, res) => {
    const deletedEnrolment = await Enrolment.deleteOne({_id: req.params.id});
    res.json(deletedEnrolment);
});

module.exports = router;
