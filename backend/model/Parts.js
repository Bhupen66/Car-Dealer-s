const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    partNumber: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Part', partSchema);
