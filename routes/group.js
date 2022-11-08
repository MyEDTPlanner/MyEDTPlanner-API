
const express = require('express');
const router = express.Router();
const {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup,
} = require('../controllers/group');

// Get groups
router.get('/', async (req, res) => {
    const response = await getGroups(req.query);
    res.send(response);
});

// Create an group
router.post('/', async (req, res) => {
    const response = await createGroup(req.body);
    return res.send(response);
});

// Update an group
router.put('/:_id', async (req, res) => {
    const { _id } = req.params;
    const response = await updateGroup(_id, req.body);
    return res.send(response);
});

// Delete an group
router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    const response = await deleteGroup(_id);
    return res.send(response);
});

module.exports = router;