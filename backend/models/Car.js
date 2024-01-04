const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    engineType: {
        type: String,
        required: true
    },
    airConditioning: {
        type: Boolean,
        default: false
    },
    transmission: {
        type: String,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    numberOfDoors: {
        type: Number,
        required: true
    },
    trunkCapacity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Car', carSchema);
