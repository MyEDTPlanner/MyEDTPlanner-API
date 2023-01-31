const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
   firstname: {
        type: String,
    },
    lastname : {
        type: String
    },
});
module.exports = mongoose.model('Teacher', TeacherSchema);