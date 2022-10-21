
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectToDatabase = require('./utils/connectToDatabase');

dotenv.config();

const indexRouter = require('./routes/index');
const eventRouter = require('./routes/event');
const port = process.env.PORT || 2000;

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
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
});

module.exports = app;