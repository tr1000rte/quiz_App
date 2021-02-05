const mongoose = require('mongoose');

var quizSchema = new mongoose.Schema({
    questioner: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    minor: {
        type: String
    }
})

const quizModel = mongoose.model('quizSchema', quizSchema);

module.exports = quizModel;