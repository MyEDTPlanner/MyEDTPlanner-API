
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectToDatabase = require('./utils/connectToDatabase');

dotenv.config();

const indexRouter = require('./routes/index');
const eventRouter = require('./routes/event');
const groupRouter = require('./routes/group');
const refreshEventsRouter = require('./routes/refresh-events');
const refreshGroupsRouter = require('./routes/refresh-groups');
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes d'entrée du projet.
app.use('/', indexRouter);
app.use('/event', eventRouter);
app.use('/group', groupRouter);
app.use('/refresh/events', refreshEventsRouter);
app.use('/refresh/groups', refreshGroupsRouter);

app.get('*', (req, res) => {
    return res.send({
        success: false,
        error: 'Route unknown',
    })
});

connectToDatabase().then(() => {
    console.info('[Starting] - Connected to database');
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    });
});

module.exports = app;