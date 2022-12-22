const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    libelle: {
        type: String,
    },
});
module.exports = mongoose.model('Group', groupSchema);