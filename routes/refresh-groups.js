
const express = require('express');
const router = express.Router();
const OFilCrawler = require('../controllers/OFilCrawler');
const group = require('../models/group');

// Retrieve groups
router.get('/', async (req, res) => {
    let crawler = new OFilCrawler();
    try {
        let groups = await crawler.getGroups();
        group.remove({});
        group.insertMany(groups, { ordered: false }, (err, docs) => {
            if (err) {
                console.log(err);
            }
        });

        res.send({
            result: groups,
            success: true,
        });

    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;