
const express = require('express');
const router = express.Router();
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/event');

// Get events
router.get('/', async (req, res) => {
    const response = await getEvents(req.query);
    res.send(response);
});

// Create an event
router.post('/', async (req, res) => {
    const response = await createEvent(req.body);
    return res.send(response);
});

// Update an event
router.put('/:_id', async (req, res) => {
    const { _id } = req.params;
    const response = await updateEvent(_id, req.body);
    return res.send(response);
});

// Delete an event
router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    const response = await deleteEvent(_id);
    return res.send(response);
});

module.exports = router;