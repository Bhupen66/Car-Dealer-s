const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        features: {
            type: String,
            required: true
        },
        moreDetails: {
            type: String,
            required: true
        },
       
    });

module.exports = mongoose.model('Car', carSchema);
