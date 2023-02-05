
const express = require('express');
const router = express.Router();
const EDTCrawler = require('../controllers/EDTCrawler');
const event = require('../models/event');
const {
    getEvents
} = require('../controllers/event');

// Retrieve events
router.get('/:_group', async (req, res) => {
    const { _group } = req.params;

    if(_group != null) {
        let parser = new EDTCrawler(_group);

        try {
            await parser.init();
            let events = await parser.getFinalCoursesList();
            
            event.deleteMany({group: _group}).exec();
            await event.insertMany(events,{ ordered: false });
            
            res.send({
                result: {
                    "group": _group,
                    "events": events, 
                    "nbEventsRetrieved": events.length
                },
                success: true,
            });
        } catch (e) {
            console.error(e.stack);
            res.status(400).json({ error: e.message });
        }
    }
    else {
        res.status(400).json({ error: 'Missing group' });
    }
});

module.exports = router;