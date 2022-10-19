const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    idgr: {
        type: String,
        required: true
    },
    code: {
        type: String,
    },
});
module.exports = mongoose.model('groups', groupSchema);