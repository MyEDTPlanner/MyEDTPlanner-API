const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    idteach: {
        type: String,
        required: true
    },
   firstname: {
        Type: String,
    },
    lastname : {
        type: String
    },
    presential: {
        type: Boolean
    }
});
module.exports = mongoose.model('Teachers', TeacherSchema);