const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    isReturned: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Rental', rentalSchema);
