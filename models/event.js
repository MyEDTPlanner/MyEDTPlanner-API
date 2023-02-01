const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    locations: {
        type: Array,
        default: [String],
    },
    attendees: {
        type: Array,
        default: [String],
    },
    groups: {
        type: Array,
        default: [String]
    },
    done: {
        type: Boolean
    },
    presential: {
        type: Boolean
    },
    code: {
        type: String
    },
    uuid: {
        type: String
    },
});
module.exports = mongoose.model('Event', eventSchema);