const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true
    },
    end: {
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
    attendee: {
        type: Array,
        default: [String],
    },
    groups: {
        type: Array,
        default: [String],
    },
    done: {
        type: Boolean
    },
    presential: {
        type: Boolean
    }
});
module.exports = mongoose.model('Event', EventSchema);