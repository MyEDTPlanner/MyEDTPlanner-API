
const express = require('express');
const router = express.Router();
const EDTCrawler = require('../controllers/EDTCrawler');
const event = require('../models/event');

// Retrieve events
router.get('/:_group', async (req, res) => {
    const { _group } = req.params;

    if(_group != null) {
        let parser = new EDTCrawler(_group);

        try {
            await parser.init();
            let events= await parser.getFinalCoursesList();
             event.remove();
             event.insertMany(events,{ ordered: false }, (err, docs) => {
                if (err) {
                    console.log(err);
                }
            });
    
            res.send({
                result: events,
                success: true,
            });
            
            
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    else {
        res.status(400).json({ error: 'Missing group' });
    }
});

module.exports = router;