
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectToDatabase = require('./utils/connectToDatabase');
console.log(process.env);

const indexRouter = require('./routes/index');
const eventRouter = require('./routes/event');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes d'entrée du projet.
app.use('/', indexRouter);
app.use('/event', eventRouter);

app.get('*', (req, res) => {
    return res.send({
        success: false,
        error: 'Route unknown',
    })
});

connectToDatabase().then(() => {
    console.info('[Starting] - Connected to database');
});

module.exports = app;