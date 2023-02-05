
const express = require('express');
const router = express.Router();
const OFilCrawler = require('../controllers/OFilCrawler');
const group = require('../models/group');
const { getGroups } = require('../controllers/group');

// Retrieve groups
router.get('/', async (req, res) => {
    let crawler = new OFilCrawler();
    try {
        let groups = await crawler.getGroups();
        group.deleteMany({}).exec();

        await group.insertMany(groups, { ordered: false });
        res.send({
            result: {
                "groups": groups,
                "nbGroupsRetrieved": groups.length,
            },
            success: true,
        });

    } catch (e) {
        console.error(e.stack);
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;